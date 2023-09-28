
// {
//     "_id": "650b0939cf1b3090ec17bd6b",
//     "firstName": "John",
//     "lastName": "Johnson",
//     "userName": "Johnson123",
//     "password": "$2b$10$ceKcy1VguU34w67zAMEyx.2l2ZUtT7m.buyw3nUSBdVrArPrEDYWi",
//     "email": "jangryta9@gmail.com",
//     "my_recipes": [],
//     "saved_recipes": [],
//     "activated": true,
//     "image": "http://localhost:5000/static/defaultUser.png",
//     "activation_token": "",
//     "__v": 0
//   }

  const userToDTO = (user) => {
    return {
        userId: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        my_recipes: user.my_recipes,
        saved_recipes: user.saved_recipes,
    }
}

module.exports = userToDTO