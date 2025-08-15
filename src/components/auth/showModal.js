export const isVisable = (type, onChangeIsOpenModalAuth) => {
  let newItem = null;

  if (type === "close") {
    newItem = {
      forgotPassword: false,
      login: false,
      register: false,
      newPass: false
    };
  } else if (type === "forgot") {
    newItem = {
      forgotPassword: true,
      login: false,
      register: false,
      newPass: false
    };
  } else if (type === "login") {
    newItem = {
      forgotPassword: false,
      login: true,
      register: false,
      newPass: false
    };
  } else if (type === "register") {
    newItem = {
      forgotPassword: false,
      login: false,
      register: true,
      newPass: false
    };
  }else if(type === "newpass"){
    newItem = {
      forgotPassword: false,
      login: false,
      register: false,
      newPass: true
    };
  }
  
  onChangeIsOpenModalAuth(newItem);
};
