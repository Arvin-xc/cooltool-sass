export interface AVIFModule extends EmscriptenWasm.Module {
  decode(data: BufferSource): ImageData | null
}

declare let moduleFactory: EmscriptenWasm.ModuleFactory<AVIFModule>

export default moduleFactory
