"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsers = exports.deleteUser = exports.updateUser = exports.addUser = exports.showUser = exports.allUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        if (users.length < 1)
            return res.json({ msg: "Please add user" });
        res
            .status(200)
            .json(users);
    }
    catch (err) {
        res
            .status(400)
            .json({
            msg: err.toString()
        });
    }
});
exports.allUsers = allUsers;
const showUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id);
        if (!user)
            return res.json({ msg: "user not found" });
        res
            .status(200)
            .json(user);
    }
    catch (err) {
        res
            .status(400)
            .json({
            msg: err.toString()
        });
    }
});
exports.showUser = showUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default(req.body);
    user.save((err) => {
        if (err) {
            res.json({ msg: err });
        }
        else {
            res.send(user);
        }
    });
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => {
        if (!user) {
            return res.json({ msg: "User not found" });
        }
        res.send(user);
    })
        .catch(err => {
        res.status(500).send(err);
    });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findByIdAndRemove(req.params.id)
        .then(() => {
        console.log("Destroyed user");
        res.json({ msg: "Deleted user" });
    })
        .catch(err => {
        res.send(err);
    });
});
exports.deleteUser = deleteUser;
const deleteAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.deleteMany()
        .then(() => {
        res.json({ msg: "Removed all" });
    })
        .catch(err => {
        res.send(err);
    });
});
exports.deleteAllUsers = deleteAllUsers;
