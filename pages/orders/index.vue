<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import type { Database } from "~/@types/supabase";

const user = useSupabaseUser();
const { data: pricing } = useAsyncData("pricing", () => usePricing());
const { data: orders } = await useSupabaseClient<Database>()
  .from("Order")
  .select("*")
  .filter("status", "eq", "PAID")
  .eq("userId", user.value.id);
</script>

<template>
  <div>
    <h1 class="font-bold text-lg">订单明细</h1>
    <div class="border rounded mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> 订单类型 </TableHead>
            <TableHead>订单状态</TableHead>
            <TableHead>创建时间</TableHead>
            <TableHead>支付时间</TableHead>
            <TableHead class="text-right"> 金额 </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="order in orders" :key="order.id">
            <TableCell class="font-medium">
              {{
                pricing?.find((item) => item.type === order.subscriptionType)
                  ?.title
              }}
            </TableCell>
            <TableCell>支付成功</TableCell>
            <TableCell>
              {{ dayjs(order.createdAt).format("YYYY-MM-DD hh:mm:ss") }}
            </TableCell>
            <TableCell>
              {{ dayjs(order.updatedAt).format("YYYY-MM-DD hh:mm:ss") }}
            </TableCell>
            <TableCell class="text-right">
              {{ order.amount }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <p class="mt-4 text-center text-xs text-gray-500">
      所有支付成功的订单，如需发票或有任何疑问请联系客服。
    </p>
  </div>
</template>
