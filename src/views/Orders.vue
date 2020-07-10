<template>
  <v-container>
    <div class="mt-10">
      <v-data-table
        :headers="headers"
        :items="filteredOrders"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
        ><template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              <v-icon>mdi-magnify</v-icon>Search
            </v-toolbar-title>
            <v-text-field
              v-model="search"
              class="mx-4"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-toolbar>
          <div class="ml-4 pb-2">
            <p>Filter by create date</p>
            <v-row>
              <v-col cols="4">
                <vc-date-picker mode="range" v-model="range" />
              </v-col>
              <v-col cols="2">
                <v-btn outlined @click="clear()">Clear Filter</v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="ml-4">
            <p>Total amount: ${{ totalAmount() }}</p>
          </div>
        </template>
        <template v-slot:item.DeliveryAmount="{ item }">
          {{ formatDeliveryAmount(item.DeliveryAmount) }}
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      range: {
        start: null,
        end: null
      },
      search: "",
      headers: [
        {
          text: "Order name",
          align: "start",
          sortable: false,
          value: "OrderName"
        },
        { text: "Customer Company", value: "CustomerCompany" },
        { text: "Customer name", value: "CustomerName" },
        { text: "Order date", value: "OrderDate" },
        { text: "Delivered Amount", value: "DeliveryAmount" },
        { text: "Total Amount", value: "TotalAmount" }
      ],
      orders: [],
      filteredOrders: []
    };
  },
  created() {
    this.initialize();
  },
  watch: {
    range: function() {
      if (this.range.start !== null && this.range.end !== null) {
        this.filterOrders();
      }
    }
  },
  methods: {
    initialize() {
      axios
        .get("http://127.0.0.1:8999/orders")
        .then(response => {
          this.orders = response.data.data;
          this.filteredOrders = this.orders;
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatDeliveryAmount(da) {
      if (da === 0) {
        return "-";
      } else {
        return da;
      }
    },
    totalAmount() {
      let ta = 0.0;
      this.filteredOrders.forEach(order => {
        ta += order.TotalAmount;
      });
      return ta.toFixed(2);
    },
    clear() {
      this.range = {
        start: null,
        end: null
      };
      this.filteredOrders = this.orders;
    },
    filterOrders() {
      const start = this.range.start;
      const end = this.range.end;
      this.filteredOrders = [];
      this.orders.forEach(order => {
        const orderDate = order.FormatDate.split(" ")[0];
        console.log(orderDate);
        if (Date.parse(orderDate) >= start && Date.parse(orderDate) <= end) {
          this.filteredOrders.push(order);
        }
      });
    }
  }
};
</script>
