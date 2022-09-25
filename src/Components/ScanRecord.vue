<script lang="ts">
import { FormatPrice, IRecord } from "../Util/barcode";

export default {
    props: {
        record: Object as () => IRecord,
        compact: Boolean
    },
    data() {
        return {
            FormatPrice
        }
    }
}
</script>

<template>
    <div class="frame">
        <h2><slot></slot></h2>
        <h1 class="totalPrice">{{ FormatPrice(record.total) }}</h1>
        <ul class="scans" v-if="!compact">
            <li v-for="scan in record.scans">{{ scan.item }} - {{ FormatPrice(scan.price) }}</li>
        </ul>
    </div>
</template>

<style lang="less">
    .frame {
        font-family: sans-serif;
    }

    h1.totalPrice {
        margin: 0.2em;
        font-size: 50pt;
    }

    h2 {
        font-size: 20pt;
        margin: 0.2em;
    }

    ul.scans {
        font-size: larger;
        overflow-y: auto;
        max-height: 70vh;
    }
</style>