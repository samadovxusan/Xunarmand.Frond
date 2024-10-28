export interface ProductRequest {
  pagesize?: number;
  pageindex?: number;
}

// Creating an instance with a default value
const productRequest: ProductRequest = {
  pagesize: 10,
  pageindex: 10,
};

// Defining the property in a class with a default value
class MyComponent {
  productRequest: ProductRequest = {
    pagesize: 10,
    pageindex: 10,
  };
}
