const UserService = require('../service/user.services');

exports.register = async(req, res,next) => {
    try {
        const { email, password, name ,phone} = req.body;
       const successRes = await UserService.registerUser(email, password, name, phone);
       console.log(successRes);
        res.json({status:true, message: 'User created successfully'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async(req, res,next) => {
    try {
        const { email, password } = req.body;

    const user = await UserService.checkUser(email);

    if(!user){
        throw new Error('User not found');
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new Error('Invalid password');
    }
        let tokenData = {_id: user._id, email: user.email};
        const token = await UserService.generateToken(tokenData, "secretKey","720h")

        res.status(200).json({status:true, message: 'User logged in successfully', token});

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getUser = async(req, res,next) => {
    try {
        const userId = req.params.id;
        const successRes = await UserService.getUserdata(userId);
        console.log(successRes);
        res.json({successRes});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async(req, res,next) => {
    try {
        const id = req.params.id;
        const successRes = await UserService.updateUserdata(id,req.body);
        res.status(200).json({status:true, message: 'User updated successfully', successRes});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}