const loginUser = (email, password, onSucess, onError) => {
  setTimeout(() => {
    const error = false;

    if (error) {
      return onError();
    }
    console.log("Usuário verificado!");
    onSucess({ email });
  }, 3000);
};

const getVideos = (onSucess) => {
  setTimeout(() => {
    onSucess([1, 2, 3]);
  }, 2000);
};

const user = loginUser(
  "email@email",
  123456,
  (user) => {
    console.log("Usuário logado com sucesso!");
    console.log(user);
    getVideos((videos) => {
      console.log(videos);
    });
  },
  () => {
    console.log("Usuário não encontrado");
  }
);
