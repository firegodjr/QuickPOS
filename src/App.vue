<script lang="ts">
import { ParseBarcodeString, TallyCents as Tally, IRecord as IScanRecord } from "./Util/barcode"
import ScanRecord from "./Components/ScanRecord.vue";
import { ref } from "vue";

let CurrentRecord = ref({
        total: 0,
        scans: []
    });

let BufferRecords = ref([]);

let CashierRecord = ref({
        total: 0,
        scans: []
    });

function processInput(ev: Event) {
    let element = ev.target as any;
    console.log("Processing " + element.value);

    let code: string = element.value;

    // Handle special operations
    if(code.startsWith(">>")) {
        let operation = code.replace(">>", "");
        switch(operation.toUpperCase()) {
            case "NEXT":
                handleScannerNext();
                break;

            case "DEL":
                handleDel();
                break;
        }
    }
    else {
        let parsed = ParseBarcodeString(code);

        if(!isNaN(parsed.price))
        {
            CurrentRecord.value.scans.push(parsed);
            CurrentRecord.value.total = Tally(CurrentRecord.value.scans);
        }
    }

    element.value = "";
}

/** Push scanned goods to the buffer to begin working on the next order */
function handleScannerNext() {
    if(CurrentRecord.value.scans.length > 0) {
        let bufferRecord = {
            total: CurrentRecord.value.total,
            scans: CurrentRecord.value.scans
        }

        BufferRecords.value.unshift(bufferRecord);

        CurrentRecord.value.total = 0;
        CurrentRecord.value.scans = [];
    }
}

/** Pull a scan record from the buffer to check the customer out */
function handleCashierNext() {
    let newRecord = BufferRecords.value.pop();
    if(newRecord) {
        CashierRecord.value = newRecord;
    }
    else {
        CashierRecord.value.total = 0;
        CashierRecord.value.scans = [];
    }
}

/** Delete the last scanned item */
function handleDel() {
    CurrentRecord.value.scans.pop();
    CurrentRecord.value.total = Tally(CurrentRecord.value.scans);
}

function manualNext(ev: Event) {
    let element = ev.target as any;
    handleCashierNext();
    element.value = "";
}

export default {
    mounted() {
        window.onclick = () => {
            document.getElementById("scanInput").focus();
        }
    },
    data() {
        return {
            processInput,
            manualNext,
            CurrentRecord,
            BufferRecords,
            CashierRecord
        }
    },
    components: { ScanRecord }
}
</script>

<template>
    <input id="scanInput" type="text" @keyup.enter="processInput" @keyup.space="manualNext" />
    <div id="paneWrapper">
        <ScanRecord id="leftPane" class="pane" :record="CurrentRecord">Current Order</ScanRecord>
        <div id="bufferListPane" class="pane">
            <ScanRecord v-for="record in BufferRecords" class="bufferItem" compact :record="record"></ScanRecord>
        </div>
        <ScanRecord id="rightPane" class="pane" :record="CashierRecord">Cashier Order</ScanRecord>
    </div>
</template>

<style lang="less">
    body {
        margin: 0;
    }

    .pane {
        padding: 0.5em;
        box-sizing: border-box;
        height: 100vh;
    }

    #scanInput {
        position: fixed;
        left: 0;
        bottom: 0;
    }

    #paneWrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    #bufferListPane {
        grid-column: 2;

        padding-left: 1em;
        padding-right: 1em;
        background-color: lightgray;
        box-shadow: 0 0 0.5em gray inset;
        overflow-y: auto;

        .frame:last-child {
            background-color: yellow;

            &::after {
                display: block;
                font-style: italic;
                font-weight: bold;
                justify-content: center;
                margin-left: 1em;
                content: "Press Spacebar to check out >";
            }
        }
    }

    #leftPane {
        grid-column: 1;
    }

    .bufferItem {
        background-color: white;
        box-shadow: 0 0 0.5em gray;
        border-radius: 0.5em;
    }

    #rightPane {
        grid-column: 3;
    }
</style>