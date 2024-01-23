
const userController = {
    login: (req, res) => {
        res.status(200).json({ message: "Login test controller" });
    },
};

module.exports = userController;