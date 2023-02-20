require("dotenv").config();

const express = require("express");

const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: process.env.UPLOADS_FOLDER });

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");
const fileControllers = require("./controllers/fileControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const postControllers = require("./controllers/postControllers");
const categoryControllers = require("./controllers/categoryControllers");
const groupControllers = require("./controllers/groupControllers");
const commentControllers = require("./controllers/commentControllers");
const userGroupControllers = require("./controllers/userGroupControllers");
const validateUser = require("./middleware/validateUser");

/// //// Authentification //////

router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  validateUser,
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.use(verifyToken);

/// //// Gestion des users ///////
router.get("/api/users/limit/:base", userControllers.browseBy5);
router.get("/api/users", userControllers.browse);
router.get("/api/not-all-users/:query", userControllers.browseInBackend);
router.get("/api/users/:id", userControllers.read);
router.post("/api/users", hashPassword, userControllers.add);
router.put("/api/users/:id", userControllers.edit);
router.put(
  "/api/avatars/:userid",
  upload.single("picture"),
  fileControllers.fileRename,
  userControllers.editUserAvatar
);
router.delete("/api/users/:id", userControllers.destroy);

// appel de mes posts personnel

router.get("/api/myposts/user/:id/limit/:base", postControllers.browseMyPosts);

/// /// Gestion des posts ///////

router.get("/api/posts/limit/:base", postControllers.browse); // Feed de base
router.get(
  "/api/posts/usergroup/:id/limit/:base",
  postControllers.browseUserGroup
); // Feed de base
router.get(
  "/api/posts/group/:group/limit/:base",
  postControllers.browseByGroup
); // Feed par groupe
router.get(
  "/api/posts/category/:category/limit/:base",
  postControllers.browseByCategory
); // Feed par category

router.get("/api/posts/:id", postControllers.read);
router.post(
  "/api/posts",
  upload.single("picture"),
  fileControllers.fileRename,
  postControllers.add
);
router.put("/api/posts/:id", postControllers.edit);
router.delete("/api/posts/:id", postControllers.destroy);

/// //// Gestion des categories ///////

router.get("/api/categories", categoryControllers.browse);
router.get("/api/categories/:id", categoryControllers.read);
router.post(
  "/api/categories",
  upload.single("picture"),
  fileControllers.fileRename,
  categoryControllers.add
);
router.put("/api/categories/:id", categoryControllers.edit);
router.delete("/api/categories/:id", categoryControllers.destroy);

// Gestion des groupes
router.get("/api/groups", groupControllers.browse);
router.get("/api/groups/:id", groupControllers.read);
router.post(
  "/api/groups",
  upload.single("picture"),
  fileControllers.fileRename,
  groupControllers.add
);
router.put("/api/groups/:id", groupControllers.edit);
router.delete("/api/groups/:id", groupControllers.destroy);

// Gestion des groupes par utiliateur

router.get("/api/groups/user/:id", userGroupControllers.findGroups);

// je récupère les groupes auxquels un utilisateur appartient en fonction de l'id de l'utilisateur

router.get(
  "/api/user_group/user/:userId",
  userGroupControllers.findGroupByUserId
);
// je récupère les utilisateurs d'un groupe en fonction de l'id du groupe
router.get(
  "/api/user_group/group/:groupId/limit/:base",
  userGroupControllers.findUserByGroupId
);
// je récupère les utilisateurs d'un groupe en fonction de l'id du groupe et avec un mot de recherche
router.get(
  "/api/user_group/group/:groupId/:query",
  userGroupControllers.findUserByGroupIdAndQuery
);
// J'ajoute un utilisateur dans un groupe
router.post("/api/user_group", userGroupControllers.addUserInGroup);

// J'ajoute un utilisateur dans plusieurs groupes

router.post("/api/user_groups", userGroupControllers.addUserInSeveralGroup);

// je supprime tous les groups auquel un utilisateur appartient en fonction de l'id de l'utilisateur
router.delete(
  "/api/user_group/user/:userId",
  userGroupControllers.deleteByUserId
);
// je supprime un utilisateur d'un groupe en fonction de l'id du groupe
router.delete(
  "/api/user_group/group/:groupId/user/:userId",
  userGroupControllers.deleteByGroupId
);

// Gestion des uploads
// route POST pour recevoir un fichier
router.post("/api/avatar", upload.single("avatar"), fileControllers.fileRename);

// Gestion des commentaires
router.get("/api/posts/:id/comments", commentControllers.browse);
router.get(
  "/api/posts/:id/commentsamount",
  commentControllers.browseCommentsAmount
);
router.post("/api/posts/:id/comments", commentControllers.add);
router.delete(
  "/api/posts/:id/comments/:comment_id",
  verifyToken,
  commentControllers.destroy
);

module.exports = router;
