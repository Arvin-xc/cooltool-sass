<script setup lang="ts">
import { filesize } from 'filesize'
import { v4 as uuid } from 'uuid'
import { compressImage, getFileType } from '../squoosh'
import { downloadFile, downloadFiles } from '~/lib/file';

enum Status {
  processing = 'processing',
  complete = 'complete',
  error = 'error'
}
type RcFile = {
  originFile: File
  size: string
  type: string
  uuid: string
  status: Status
  response?: {
    jpg?: File
    png?: File
    webp?: File
    svg?: File
  }
}
type OutputType = 'jpg' | 'png' | 'webp'

const emit = defineEmits(['preview'])
const props = defineProps<{
  files: File[]
}>()
const { files } = toRefs(props)
const fileList = ref<RcFile[]>([])

const initConvertTypes: OutputType[] = ['jpg', 'png', 'webp']
const convertTypes = ref<OutputType[]>(initConvertTypes)
const showConvertTypes = ref<boolean>(false)

// watch(props, async (props) => {
//   const uploadFiles = props.files.map(async (file) => {
//     return {
//       originFile: file,
//       size: filesize(file.size).toString(),
//       uuid: uuid(),
//       status: Status.processing,
//       type: await getFileType(file)
//     }
//   })

//   fileList.value = fileList.value.concat(await Promise.all(uploadFiles))
// })

const process = (file: RcFile, targetType: OutputType, convert?: boolean) => {
  const target = fileList.value.find(_file => _file.uuid === file.uuid)

  compressImage(file.originFile, convert ? targetType : undefined)
    .then((compressed) => {
      target.response = {
        ...target.response,
        [targetType]: compressed
      }
      if (showConvertTypes.value) {
        if (Object.keys(target.response).length >= convertTypes.value.length) {
          target.status = Status.complete
        }
      } else {
        if (target.response[targetType]) {
          target.status = Status.complete
        }
      }
    })
    .catch((err) => {
      console.log(err)
      // TODO:report sentry
      target.status = Status.error
    })
}
watch(
  [files],
  async (data) => {
    const [files] = data
    const uploadFiles = files.map(async (file) => {
      return {
        originFile: file,
        size: filesize(file.size).toString(),
        uuid: uuid(),
        status: Status.processing,
        type: await getFileType(file)
      }
    })

    fileList.value = fileList.value.concat(await Promise.all(uploadFiles))

    for (const file of fileList.value) {
      if (showConvertTypes.value && convertTypes.value.length) {
        for (const convertType of convertTypes.value) {
          if (!file.response?.[convertType]) {
            process(file, convertType, true)
          }
        }
      } else {
        if (!file.response?.[file.type]) {
          process(file, file.type as OutputType)
        }
      }
    }
  },
  { deep: true }
)

const convertTypeOptions: { value: OutputType, label: string }[] = [
  {
    value: 'png',
    label: 'PNG'
  },
  {
    value: 'jpg',
    label: 'JPEG'
  },
  {
    value: 'webp',
    label: 'WEBP'
  }
]
const onSelectAll = () => {
  convertTypes.value
    = convertTypes.value.length === initConvertTypes.length
      ? []
      : initConvertTypes
}

const onShowConvertTypes = (show) => {
  showConvertTypes.value = show
}
const onConvertTypeChange = (key: OutputType, selected: boolean) => {
  if (selected) {
    convertTypes.value.push(key)
  } else {
    convertTypes.value = convertTypes.value.filter(item => item !== key)
  }
}
const progressColorMap = {
  complete: 'primary',
  error: 'red',
  processing: 'blue'
}
const columns = [
  {
    key: 'originFile',
    label: ''
  },
  {
    key: 'size',
    label: ''
  },
  {
    key: 'uuid',
    label: ''
  },
  {
    key: 'response',
    label: ''
  }
]
const onDownloadAllFiles = () => {
  const files = fileList.value
    .map((file) => {
      if (showConvertTypes.value) {
        return convertTypes.value.map(type => file.response[type])
      } else {
        return file.response[file.type]
      }
    })
    .flat(2)
  downloadFiles(files)
}
const demos = [
  '/assets/cars-stunning-quality.jpg',
  '/assets/products-stunning-quality-v2.jpg',
  '/assets/animals-outstanding-quality-v2.jpg'
]
const onPreview = async (image) => {
  const res = await fetch(image)
  const blob = await res.blob()
  emit('preview', new File([blob], 'demo.jpg'))
}
</script>

<template>
  <div class="w-full mt-6">
    <UCheckbox
      class="justify-center"
      label="自动转换格式"
      variant="outline"
      @change="onShowConvertTypes"
    />
    <div class="flex items-center justify-center mt-2 h-8">
      <template v-if="showConvertTypes">
        <UCheckbox
          v-for="item in convertTypeOptions"
          :key="item.label"
          class="mx-3"
          :model-value="!!convertTypes.includes(item.value)"
          :label="item.label"
          @change="(selected) => onConvertTypeChange(item.value, selected)"
        />
        <UButton
          class="ml-2"
          variant="soft"
          size="sm"
          @click="onSelectAll"
        >
          选择全部
        </UButton>
      </template>
    </div>
    <div
      v-if="fileList.length"
      class="mt-10"
    >
      <div class="flex justify-end">
        <UButton @click="onDownloadAllFiles">
          下载全部
        </UButton>
      </div>
      <UTable
        :rows="fileList"
        :columns="columns"
      >
        <template #originFile-data="{ row }">
          <div class="w-[10vw] truncate h-8 leading-[32px]">
            {{ row.originFile.name }}
          </div>
        </template>
        <template #type-data="{ row }">
          <UKbd :value="row.type.toUpperCase()" />
        </template>
        <template #uuid-data="{ row }">
          <UProgress
            animation="carousel"
            :color="progressColorMap[row.status]"
            :value="row.status !== Status.processing ? 100 : null"
            class="w-[18vw]"
          />
        </template>
        <template #response-data="{ row }">
          <div class="flex items-center w-[20vw]">
            <template v-if="showConvertTypes && convertTypes.length">
              <div
                v-for="convertType in convertTypes"
                :key="convertType"
                class="mx-2"
              >
                <UChip
                  :text="convertType.toUpperCase()"
                  size="2xl"
                >
                  <UButton
                    :loading="!row.response?.[convertType]"
                    variant="outline"
                    class="md:w-[110px]"
                    @click="
                      () =>
                        downloadFile(
                          row.response?.[convertType]
                            || row.response?.[row.type]
                        )
                    "
                  >
                    <UIcon
                      name="i-heroicons-arrow-down-tray"
                      class="text-lg font-bold"
                    />
                    <template
                      v-if="row.response?.[convertType]"
                      #trailing
                    >
                      <div class="hidden md:block">
                        {{ filesize(row.response?.[convertType].size) }}
                      </div>
                    </template>
                  </UButton>
                </UChip>
              </div>
            </template>
            <UChip
              v-else
              :text="row.type.toUpperCase()"
              size="2xl"
            >
              <UButton
                class="w-[120px]"
                :loading="!row.response?.[row.type]"
                variant="outline"
                @click="() => downloadFile(row.response?.[row.type])"
              >
                <UIcon
                  name="i-heroicons-arrow-down-tray"
                  class="text-lg font-bold"
                />
                <template
                  v-if="row.response?.[row.type]"
                  #trailing
                >
                  {{ filesize(row.response[row.type].size) }}
                </template>
              </UButton>
            </UChip>
          </div>
        </template>
      </UTable>
    </div>
    <div
      v-else
      class="mt-8 w-max mx-auto"
    >
      <p class="text-center">
        试试示例
      </p>
      <UBlogList
        orientation="horizontal"
        class="mt-6"
        :ui="{ wrapper: 'md:gap-3 gap-2' }"
      >
        <UBlogPost
          v-for="image in demos"
          :key="image"
          class="w-48 md:w-32 cursor-pointer mx-auto"
          :image="image"
          @click="() => onPreview(image)"
        />
      </UBlogList>
    </div>
  </div>
</template>
