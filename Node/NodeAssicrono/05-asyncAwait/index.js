const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;

      if (error) {
        return reject("Usuário não encontrado");
      }

      console.log("Usuário encontrado");
      resolve({ email, password });
    }, 3000);
  });
};

const getUserVideos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;
      if (error) {
        return reject("Falha ao carregar os vídeos");
      }

      console.log("Videos dos usuário encontrados");
      resolve(["v1", "v2"]);
    }, 3000);
  });
};

const getUserVideosDetais = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = false;

      if (error) {
        return reject("Videos não encontrado");
      }

      console.log("Videos encontrado");
      resolve({
        id: 1,
        name: "filme 1",
      });
    }, 3000);
  });
};

// const user = loginUser("email@email.com", 12345)
//   .then((user) => {
//     console.log("Dados do usuário: ", user);
//     getUserVideos().then((videos) => {
//       console.log("Os vídeos são: ", videos);
//     });
//     getUserVideosDetais()
//       .then((video) => {
//         console.log(video);
//       })
//       .catch((errorMsg) => {
//         console.log(errorMsg);
//       });
//   })
//   .catch((errorMsg) => {
//     console.log(errorMsg);
//   })
//   .catch((errorMsg) => {
//     console.log(errorMsg);
//   });

const longinData = async () => {
  try {
    const user = await loginUser("teste@teste.com", 12345);
    const userVideos = await getUserVideos();
    const userVideoDetails = await getUserVideosDetais();

    console.log(user);
    console.log(userVideos);
    console.log(userVideoDetails);
  } catch (err) {
    console.log(err);
  }
};

// Executar função assincrona
longinData();

// Executar algo extamente depois da função assincrona
console.log("Executar antes");
longinData().then(() => {
  console.log("executar depois");
});

// ou para executar algo depois da função assincrona

const init = async () => {
  console.log("Antes 2");
  await longinData();
  console.log("Depois 2");
};

init();
