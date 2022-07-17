import { Request, Response } from "express";
import User from '../models/user';

export const allUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()

    if(users.length < 1) return res.json({msg: "Please add user"})
    
    res
    .status(200)
    .json(users)
  } catch (err: any) {
    res
      .status(400)
      .json({
        msg: err.toString()
      });
  }
}

export const showUser = async(req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id)

    if(!user) return res.json({msg: "user not found"})

    res
      .status(200)
      .json(user)

  } catch (err: any) {
    res
      .status(400)
      .json({
        msg: err.toString()
      });
  }
}

export const addUser = async (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err: any) => {
    if (err) {
      res.json({msg: err});
    } else {
      res.send(user);
    }
  });
};

export const updateUser = async(req: Request, res: Response) => {
  await User.findByIdAndUpdate(req.params.id, req.body, {new : true })
  .then(user => {
    if(!user){
      return res.json({msg: "User not found"})
    }
    res.send(user)
  })
  .catch( err => {
    res.status(500).send(err)
  })
};

export const deleteUser = async(req: Request, res: Response) => {
  await User.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("Destroyed user")
      res.json({msg : "Deleted user"})
    })
    .catch(err => {
      res.send(err)
    })
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  User.deleteMany()
    .then( () => {
      res.json({msg: "Removed all"})
    })
    .catch(err => {
      res.send(err)
    })
}