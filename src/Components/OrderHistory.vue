<script setup lang="ts">
import { FormatPrice, IOrder, IOrderHistoryItem } from '../Util/barcode';


let props = defineProps<{
    records: IOrderHistoryItem[]
}>()
</script>

<template>
<div class="history">
    <label>Previous Transactions</label>
    <div class="records">
        <table>
            <thead>
                <tr>
                    <td>Total</td>
                    <td>Time Completed</td>
                </tr>
            </thead>
            <tr v-for="order in records.slice().reverse()">
                <td v-text="FormatPrice(order.total)"></td>
                <td v-text="order.time"></td>
            </tr>
        </table>
    </div>
</div>
</template>

<style scoped lang="less">
.history {
    font-family: sans-serif;
    box-sizing: border-box;
    padding: 1em;
    position: absolute;
    width: 100%;
    background-color: white;
    bottom: 0;

    label {
        font-weight: bold;
    }
}

.records {
    box-shadow: 0 0 0.5em gray inset;
    height: 30vh;
    overflow-y: scroll;

    table {
        border-spacing: 0;
        width: 100%;
        thead {
            font-weight: bold;
        }
        tr {
            &:nth-child(even) {
                background-color: lightgray;
            }
        }
        td {
            padding: 0.5em;
            border: none;
            border-right: 1px solid black;
        }
    }
}
</style>