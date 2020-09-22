import client from "./client";

const endpoint = "/invoices";

const getInvoices = () => client.get(endpoint);

export default {
  getInvoices,
};
