const getProducts = () => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        name: "lenovo slim 5",
      },
    ]);
  });
};

const getCategory = () => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 2,
        name: "notbooks",
      },
    ]);
  });
};

const getUsers = () => {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        name: "Raphael",
      },
    ]);
  });
};

// O Promise.all faz n requisçõea syncronas porém se uma requisição falahar todas falham
const initPromiseAll = async () => {
  console.log("PromiseAll");
  const [products, category, users] = await Promise.all([
    getProducts(),
    getCategory(),
    getUsers(),
  ]);

  console.log(products);
  console.log(category);
  console.log(users);
};

initPromiseAll();

// O Promise.allSettled armazena os resultados em um array, assim não importa se uma falahou ou não

const initPromiseAllSettled = async () => {
  console.log("PromiseAllSettled");
  const results = await Promise.allSettled([
    getProducts(),
    getCategory(),
    getUsers(),
  ]);

  console.log(results);
};

initPromiseAllSettled();
