
   import { createRequire } from 'module';
   const require = createRequire(import.meta.url);
  
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";

// src/config/config.ts
import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config = {
  port: process.env.PORT,
  urls: {
    dbUrl: process.env.DATABASE_URL,
    frontEndUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL
  },
  node_env: process.env.NODE_ENV,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  },
  admin: {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
};

// src/app.ts
import cookieParser from "cookie-parser";
import status10 from "http-status";

// src/middleware/globalErrorHandler.ts
import httpStatus from "http-status";

// prisma/generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config2 = {
  "previewFeatures": [],
  "clientVersion": "7.10.1",
  "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum Role {\n  STUDENT\n  MENTOR\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  PENDING_APPROVAL\n  REJECTED\n  BLOCKED\n}\n\nenum SubmissionStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Submission {\n  id              String           @id @default(uuid())\n  projectName     String\n  repoUrl         String           @unique\n  liveLink        String\n  description     String           @db.Text\n  status          SubmissionStatus @default(PENDING)\n  reviewComment   String?          @db.Text\n  rejectionReason String?\n  reviewedAt      DateTime?\n\n  studentId String\n  student   User   @relation("StudentSubmissions", fields: [studentId], references: [id], onDelete: Cascade)\n\n  reviewedById String?\n  reviewedBy   User?   @relation("MentorReviews", fields: [reviewedById], references: [id])\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([status])\n  @@index([studentId])\n}\n\nmodel User {\n  id       String     @id @default(uuid())\n  email    String     @unique\n  password String\n  name     String\n  role     Role       @default(STUDENT)\n  status   UserStatus @default(ACTIVE)\n\n  expertise       String?\n  bio             String? @db.Text\n  portfolioUrl    String?\n  rejectionReason String? @db.Text\n\n  submissions Submission[] @relation("StudentSubmissions")\n  reviewsDone Submission[] @relation("MentorReviews")\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([role, status])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config2.runtimeDataModel = JSON.parse('{"models":{"Submission":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"projectName","kind":"scalar","type":"String"},{"name":"repoUrl","kind":"scalar","type":"String"},{"name":"liveLink","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"SubmissionStatus"},{"name":"reviewComment","kind":"scalar","type":"String"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"reviewedAt","kind":"scalar","type":"DateTime"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"StudentSubmissions"},{"name":"reviewedById","kind":"scalar","type":"String"},{"name":"reviewedBy","kind":"object","type":"User","relationName":"MentorReviews"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"expertise","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"portfolioUrl","kind":"scalar","type":"String"},{"name":"rejectionReason","kind":"scalar","type":"String"},{"name":"submissions","kind":"object","type":"Submission","relationName":"StudentSubmissions"},{"name":"reviewsDone","kind":"object","type":"Submission","relationName":"MentorReviews"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config2.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","submissions","reviewsDone","_count","student","reviewedBy","Submission.findUnique","Submission.findUniqueOrThrow","Submission.findFirst","Submission.findFirstOrThrow","Submission.findMany","data","Submission.createOne","Submission.createMany","Submission.createManyAndReturn","Submission.updateOne","Submission.updateMany","Submission.updateManyAndReturn","create","update","Submission.upsertOne","Submission.deleteOne","Submission.deleteMany","having","_min","_max","Submission.groupBy","Submission.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","email","password","name","Role","role","UserStatus","status","expertise","bio","portfolioUrl","rejectionReason","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","projectName","repoUrl","liveLink","description","SubmissionStatus","reviewComment","reviewedAt","studentId","reviewedById","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "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_AQAAAAFAAQAAAARBAQAAAARCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQBKACFHAQAAAAFIAQAAAAFJAQAAAAEHBQAAQQAgGgAASQAgGwAASQAgPwAAADYCQAAAADYIQQAAADYIRgAASDYiBwUAAEEAIBoAAEcAIBsAAEcAID8AAAA4AkAAAAA4CEEAAAA4CEYAAEY4Ig4FAABEACAaAABFACAbAABFACA_AQAAAAFAAQAAAAVBAQAAAAVCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQBDACFHAQAAAAFIAQAAAAFJAQAAAAELBQAAQQAgGgAAQgAgGwAAQgAgP0AAAAABQEAAAAAEQUAAAAAEQkAAAAABQ0AAAAABREAAAAABRUAAAAABRkAAQAAhCwUAAEEAIBoAAEIAIBsAAEIAID9AAAAAAUBAAAAABEFAAAAABEJAAAAAAUNAAAAAAURAAAAAAUVAAAAAAUZAAEAAIQg_AgAAAAFAAgAAAARBAgAAAARCAgAAAAFDAgAAAAFEAgAAAAFFAgAAAAFGAgBBACEIP0AAAAABQEAAAAAEQUAAAAAEQkAAAAABQ0AAAAABREAAAAABRUAAAAABRkAAQgAhDgUAAEQAIBoAAEUAIBsAAEUAID8BAAAAAUABAAAABUEBAAAABUIBAAAAAUMBAAAAAUQBAAAAAUUBAAAAAUYBAEMAIUcBAAAAAUgBAAAAAUkBAAAAAQg_AgAAAAFAAgAAAAVBAgAAAAVCAgAAAAFDAgAAAAFEAgAAAAFFAgAAAAFGAgBEACELPwEAAAABQAEAAAAFQQEAAAAFQgEAAAABQwEAAAABRAEAAAABRQEAAAABRgEARQAhRwEAAAABSAEAAAABSQEAAAABBwUAAEEAIBoAAEcAIBsAAEcAID8AAAA4AkAAAAA4CEEAAAA4CEYAAEY4IgQ_AAAAOAJAAAAAOAhBAAAAOAhGAABHOCIHBQAAQQAgGgAASQAgGwAASQAgPwAAADYCQAAAADYIQQAAADYIRgAASDYiBD8AAAA2AkAAAAA2CEEAAAA2CEYAAEk2Ig4FAABBACAaAABLACAbAABLACA_AQAAAAFAAQAAAARBAQAAAARCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQBKACFHAQAAAAFIAQAAAAFJAQAAAAELPwEAAAABQAEAAAAEQQEAAAAEQgEAAAABQwEAAAABRAEAAAABRQEAAAABRgEASwAhRwEAAAABSAEAAAABSQEAAAABEQMAAFIAIAQAAFIAIC4AAEwAMC8AAAkAEDAAAEwAMDEBAE0AITIBAE0AITMBAE0AITQBAE0AITYAAE42IjgAAE84IjkBAFAAIToBAFAAITsBAFAAITwBAFAAIT1AAFEAIT5AAFEAIQs_AQAAAAFAAQAAAARBAQAAAARCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQBLACFHAQAAAAFIAQAAAAFJAQAAAAEEPwAAADYCQAAAADYIQQAAADYIRgAASTYiBD8AAAA4AkAAAAA4CEEAAAA4CEYAAEc4Igs_AQAAAAFAAQAAAAVBAQAAAAVCAQAAAAFDAQAAAAFEAQAAAAFFAQAAAAFGAQBFACFHAQAAAAFIAQAAAAFJAQAAAAEIP0AAAAABQEAAAAAEQUAAAAAEQkAAAAABQ0AAAAABREAAAAABRUAAAAABRkAAQgAhA0oAAAMAIEsAAAMAIEwAAAMAIBAuAABTADAvAAAfABAwAABTADAxAQA7ACE4AABUUiI8AQA-ACE9QAA_ACE-QAA_ACFNAQA7ACFOAQA7ACFPAQA7ACFQAQA7ACFSAQA-ACFTQABVACFUAQA7ACFVAQA-ACEHBQAAQQAgGgAAWQAgGwAAWQAgPwAAAFICQAAAAFIIQQAAAFIIRgAAWFIiCwUAAEQAIBoAAFcAIBsAAFcAID9AAAAAAUBAAAAABUFAAAAABUJAAAAAAUNAAAAAAURAAAAAAUVAAAAAAUZAAFYAIQsFAABEACAaAABXACAbAABXACA_QAAAAAFAQAAAAAVBQAAAAAVCQAAAAAFDQAAAAAFEQAAAAAFFQAAAAAFGQABWACEIP0AAAAABQEAAAAAFQUAAAAAFQkAAAAABQ0AAAAABREAAAAABRUAAAAABRkAAVwAhBwUAAEEAIBoAAFkAIBsAAFkAID8AAABSAkAAAABSCEEAAABSCEYAAFhSIgQ_AAAAUgJAAAAAUghBAAAAUghGAABZUiISBgAAXQAgBwAAXgAgLgAAWgAwLwAAAwAQMAAAWgAwMQEATQAhOAAAW1IiPAEAUAAhPUAAUQAhPkAAUQAhTQEATQAhTgEATQAhTwEATQAhUAEATQAhUgEAUAAhU0AAXAAhVAEATQAhVQEAUAAhBD8AAABSAkAAAABSCEEAAABSCEYAAFlSIgg_QAAAAAFAQAAAAAVBQAAAAAVCQAAAAAFDQAAAAAFEQAAAAAFFQAAAAAFGQABXACETAwAAUgAgBAAAUgAgLgAATAAwLwAACQAQMAAATAAwMQEATQAhMgEATQAhMwEATQAhNAEATQAhNgAATjYiOAAATzgiOQEAUAAhOgEAUAAhOwEAUAAhPAEAUAAhPUAAUQAhPkAAUQAhVgAACQAgVwAACQAgEwMAAFIAIAQAAFIAIC4AAEwAMC8AAAkAEDAAAEwAMDEBAE0AITIBAE0AITMBAE0AITQBAE0AITYAAE42IjgAAE84IjkBAFAAIToBAFAAITsBAFAAITwBAFAAIT1AAFEAIT5AAFEAIVYAAAkAIFcAAAkAIAAAAAABWwEAAAABAVsAAAA2AgFbAAAAOAIBWwEAAAABAVtAAAAAAQsUAAB6ADAVAAB-ADBYAAB7ADBZAAB8ADBaAAB9ACBbAABuADBcAABuADBdAABuADBeAABuADBfAAB_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"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config2.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config2);
}

// prisma/generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  SubmissionScalarFieldEnum: () => SubmissionScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.10.1",
  engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Submission: "Submission",
  User: "User"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var SubmissionScalarFieldEnum = {
  id: "id",
  projectName: "projectName",
  repoUrl: "repoUrl",
  liveLink: "liveLink",
  description: "description",
  status: "status",
  reviewComment: "reviewComment",
  rejectionReason: "rejectionReason",
  reviewedAt: "reviewedAt",
  studentId: "studentId",
  reviewedById: "reviewedById",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  email: "email",
  password: "password",
  name: "name",
  role: "role",
  status: "status",
  expertise: "expertise",
  bio: "bio",
  portfolioUrl: "portfolioUrl",
  rejectionReason: "rejectionReason",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// prisma/generated/prisma/enums.ts
var Role = {
  STUDENT: "STUDENT",
  MENTOR: "MENTOR",
  ADMIN: "ADMIN"
};
var UserStatus = {
  ACTIVE: "ACTIVE",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  REJECTED: "REJECTED",
  BLOCKED: "BLOCKED"
};
var SubmissionStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

// prisma/generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/utility/AppError.ts
var AppError = class extends Error {
  statusCode;
  constructor(statusCode, message, stack) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// src/middleware/globalErrorHandler.ts
import { z } from "zod";
var globalErrorHandler = async (err, _req, res, _next) => {
  const isDev = config.node_env?.toLowerCase() === "development";
  if (isDev) {
    console.log("Error from Global Error Handler:", err);
  }
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let errorMessage = err.message || "Internal Server Error";
  let errorName = err.name || "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = "You have provided incorrect field type or missing fields";
    errorName = "PrismaClientValidationError";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    errorName = "PrismaClientKnownRequestError";
    if (err.code === "P2002") {
      statusCode = httpStatus.CONFLICT;
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(", ") : typeof err.meta?.target === "string" ? err.meta.target : "";
      errorMessage = target ? `Duplicate field value for '${target}'. Please use another value.` : "Duplicate Key Error";
    } else if (err.code === "P2003") {
      statusCode = httpStatus.BAD_REQUEST;
      const field = err.meta?.field_name || "";
      errorMessage = field ? `Foreign key constraint failed on field: ${field}` : "Related record not found";
    } else if (err.code === "P2023") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Inconsistent column data or invalid ID format";
    } else if (err.code === "P2025") {
      statusCode = httpStatus.NOT_FOUND;
      errorMessage = err.meta?.cause || "Record not found";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    errorName = "PrismaClientInitializationError";
    if (err.errorCode === "P1000") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = "Authentication failed against database server. Please check your credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = "Can't reach database server";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "Error occurred during query execution";
    errorName = "PrismaClientUnknownRequestError";
  } else if (err instanceof AppError) {
    errorMessage = err.message;
    statusCode = err.statusCode;
    errorName = "AppError";
  } else if (err instanceof z.ZodError || err?.name === "ZodError") {
    statusCode = httpStatus.BAD_REQUEST;
    errorMessage = err.issues?.map((issue) => issue.message).join(", ") || "Validation Error";
    errorName = "ZodValidationError";
  } else if (err?.name === "JsonWebTokenError") {
    statusCode = httpStatus.UNAUTHORIZED;
    errorMessage = "Invalid token. Please authenticate again.";
    errorName = "JsonWebTokenError";
  } else if (err?.name === "TokenExpiredError") {
    statusCode = httpStatus.UNAUTHORIZED;
    errorMessage = "Token has expired. Please log in again.";
    errorName = "TokenExpiredError";
  } else if (err instanceof Error) {
    errorMessage = err.message;
  }
  const isClientError = statusCode >= 400 && statusCode < 500;
  res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: isDev || isClientError ? errorName : "Internal Server Error",
    message: isDev || isClientError ? errorMessage : "Internal Server Error",
    error: isDev ? err : void 0,
    stack: isDev ? err.stack : void 0
  });
};

// src/middleware/notFound.ts
import status from "http-status";
var notFound = (req, res) => {
  res.status(status.NOT_FOUND).json({
    message: "Route not Found",
    path: req.originalUrl,
    date: /* @__PURE__ */ new Date()
  });
};

// src/module/auth/auth.route.ts
import { Router } from "express";

// src/utility/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

// src/module/auth/auth.service.ts
import status2 from "http-status";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString = `${config.urls.dbUrl}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/module/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/utility/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (jwtPayload, secret, expiresIn) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn
  });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const verification = jwt.verify(token, secret);
    return {
      success: true,
      data: verification
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Token verification failed";
    console.log("Token verification failed : ", err);
    return {
      success: false,
      error: errorMessage
    };
  }
};
var jwtUtility = {
  createToken,
  verifyToken
};

// src/module/auth/auth.service.ts
var userSignUp = async (payLoad) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payLoad.email
    }
  });
  if (isUserExist) {
    throw new AppError(status2.BAD_REQUEST, "User With this email Already Exists");
  }
  const hashedPassword = await bcrypt.hash(payLoad.password, Number(config.bcrypt_salt_rounds));
  const user = await prisma.user.create({
    data: {
      name: payLoad.name,
      email: payLoad.email,
      password: hashedPassword
    }
  });
  return user;
};
var userLogin = async (payLoad) => {
  const { email, password } = payLoad;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!isUserExist) {
    throw new AppError(status2.NOT_FOUND, "User Does not Exist.");
  }
  if (isUserExist.status === UserStatus.BLOCKED) {
    throw new AppError(status2.FORBIDDEN, "User is Blocked, Contact Admin");
  }
  if (isUserExist.status === UserStatus.PENDING_APPROVAL) {
    throw new AppError(
      status2.FORBIDDEN,
      "Your account is pending admin approval."
    );
  }
  if (isUserExist.status === UserStatus.REJECTED) {
    const reason = isUserExist.rejectionReason ? `: ${isUserExist.rejectionReason}` : "";
    throw new AppError(
      status2.FORBIDDEN,
      `Your account has been rejected${reason}`
    );
  }
  if (isUserExist.status !== UserStatus.ACTIVE) {
    throw new AppError(status2.FORBIDDEN, "Your account is not active.");
  }
  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(status2.UNAUTHORIZED, "Password does not match");
  }
  const jwtPayload = {
    userId: isUserExist.id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role
  };
  const accessToken = jwtUtility.createToken(
    jwtPayload,
    config.jwt.accessSecret,
    config.jwt.accessExpiresIn
  );
  const refreshToken = jwtUtility.createToken(
    jwtPayload,
    config.jwt.refreshSecret,
    config.jwt.refreshExpiresIn
  );
  return {
    accessToken,
    refreshToken,
    user: {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
      role: isUserExist.role,
      status: isUserExist.status
    }
  };
};
var getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      expertise: true,
      bio: true,
      portfolioUrl: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true
    }
  });
  if (!user) {
    throw new AppError(status2.NOT_FOUND, "User not found");
  }
  if (user.status === UserStatus.BLOCKED) {
    throw new AppError(
      status2.FORBIDDEN,
      "Your account has been blocked. Please contact support."
    );
  }
  return user;
};
var AuthServices = {
  userSignUp,
  userLogin,
  getMe
};

// src/utility/sendResponse.ts
var sendResponse = (res, data) => {
  const response = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message
  };
  if (data.data !== void 0) {
    response.data = data.data;
  }
  return res.status(response.statusCode).json(response);
};

// src/module/auth/auth.controller.ts
import status3 from "http-status";
var userSignUp2 = catchAsync(async (req, res, next) => {
  const payLoad = req.body;
  const result = await AuthServices.userSignUp(payLoad);
  return sendResponse(res, {
    success: true,
    statusCode: status3.CREATED,
    message: "User SignUp Successfull",
    data: result
  });
});
var userLogin2 = catchAsync(async (req, res, next) => {
  const payLoad = req.body;
  const { accessToken, refreshToken, user } = await AuthServices.userLogin(payLoad);
  const isProduction = config.node_env?.toLowerCase() === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  return sendResponse(res, {
    success: true,
    statusCode: status3.OK,
    message: "User Login Successfull",
    data: {
      accessToken,
      refreshToken,
      user
    }
  });
});
var getMe2 = catchAsync(async (req, res, next) => {
  const user = req.user;
  const result = await AuthServices.getMe(user?.userId);
  return sendResponse(res, {
    success: true,
    statusCode: status3.OK,
    message: "User Profile Retrieved Successfully",
    data: result
  });
});
var AuthController = {
  userSignUp: userSignUp2,
  userLogin: userLogin2,
  getMe: getMe2
};

// src/middleware/validateRequest.ts
import httpStatus2 from "http-status";
var validateRequest = (zodSchema) => {
  return catchAsync(async (req, res, next) => {
    const payLoad = req.body ?? {};
    const result = await zodSchema.safeParseAsync(payLoad);
    if (!result.success) {
      const errorMessage = result.error.issues.map((issue) => issue.message).join(", ") || "Validation Error";
      throw new AppError(httpStatus2.BAD_REQUEST, errorMessage);
    }
    req.body = result.data;
    next();
  });
};

// src/module/auth/auth.validation.ts
import { z as z2 } from "zod";
var signUpValidationSchema = z2.object({
  name: z2.string({ error: "Name is required" }).min(1, "Name cannot be empty").trim(),
  email: z2.string({ error: "Email is required" }).email("Please provide a valid email address").trim(),
  password: z2.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters long")
});
var loginValidationSchema = z2.object({
  email: z2.string({ error: "Email is required" }).email("Please provide a valid email address").trim(),
  password: z2.string({ error: "Password is required" }).min(1, "Password cannot be empty")
});
var AuthValidation = {
  signUpValidationSchema,
  loginValidationSchema
};

// src/middleware/checkAuthentication.ts
import httpStatus3 from "http-status";
var checkAuth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus3.UNAUTHORIZED,
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifiedToken = jwtUtility.verifyToken(
      token,
      config.jwt.accessSecret
    );
    if (!verifiedToken.success) {
      throw new AppError(
        httpStatus3.UNAUTHORIZED,
        verifiedToken.error ? verifiedToken.error : "Token Verification Failed"
      );
    }
    const { email, name, userId, role } = verifiedToken.data;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus3.FORBIDDEN,
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new AppError(
        httpStatus3.NOT_FOUND,
        "User not found. Please log in again."
      );
    }
    if (user.status === "BLOCKED") {
      throw new AppError(
        httpStatus3.FORBIDDEN,
        "Your account has been blocked. Please contact support."
      );
    }
    req.user = {
      email,
      name,
      userId,
      role
    };
    next();
  });
};

// src/module/auth/auth.route.ts
var router = Router();
router.post(
  "/signup",
  validateRequest(AuthValidation.signUpValidationSchema),
  AuthController.userSignUp
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.userLogin
);
router.get("/me", checkAuth(Role.ADMIN, Role.MENTOR, Role.STUDENT), AuthController.getMe);
var AuthRouter = router;

// src/module/submission/submission.route.ts
import { Router as Router2 } from "express";

// src/module/submission/submission.service.ts
import status4 from "http-status";
var postSubmission = async (payload, user) => {
  const studentId = user?.userId || payload.studentId;
  if (user && payload.studentId && user.userId !== payload.studentId) {
    throw new AppError(
      status4.FORBIDDEN,
      "You cannot submit a project on behalf of another student."
    );
  }
  const student = await prisma.user.findUnique({
    where: { id: studentId }
  });
  if (!student) {
    throw new AppError(status4.NOT_FOUND, "Student account not found.");
  }
  if (student.role !== Role.STUDENT) {
    throw new AppError(
      status4.FORBIDDEN,
      "Only users with the student role can submit projects."
    );
  }
  if (student.status === UserStatus.BLOCKED) {
    throw new AppError(
      status4.FORBIDDEN,
      "Your account has been blocked. Please contact support."
    );
  }
  if (student.status !== UserStatus.ACTIVE) {
    throw new AppError(
      status4.FORBIDDEN,
      "Your account is not active. Please complete account verification."
    );
  }
  if (payload.repoUrl.trim().toLowerCase() === payload.liveLink.trim().toLowerCase()) {
    throw new AppError(
      status4.BAD_REQUEST,
      "Live link cannot be the same as the repository URL."
    );
  }
  const existingRepo = await prisma.submission.findUnique({
    where: { repoUrl: payload.repoUrl.trim() }
  });
  if (existingRepo) {
    throw new AppError(
      status4.CONFLICT,
      "A submission with this repository URL already exists."
    );
  }
  const existingSubmission = await prisma.submission.findFirst({
    where: {
      studentId,
      projectName: {
        equals: payload.projectName.trim(),
        mode: "insensitive"
      }
    }
  });
  if (existingSubmission) {
    if (existingSubmission.status === SubmissionStatus.APPROVED) {
      throw new AppError(
        status4.BAD_REQUEST,
        "This project has already been approved and cannot be resubmitted."
      );
    }
    if (existingSubmission.status === SubmissionStatus.PENDING) {
      throw new AppError(
        status4.BAD_REQUEST,
        "You already have a pending submission for this project. Please wait for mentor review."
      );
    }
  }
  const submission = await prisma.submission.create({
    data: {
      projectName: payload.projectName.trim(),
      repoUrl: payload.repoUrl.trim(),
      liveLink: payload.liveLink.trim(),
      description: payload.description.trim(),
      status: SubmissionStatus.PENDING,
      studentId
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  return submission;
};
var getMySubmissions = async (userId) => {
  const student = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!student) {
    throw new AppError(status4.NOT_FOUND, "Student account not found.");
  }
  if (student.status === UserStatus.BLOCKED) {
    throw new AppError(
      status4.FORBIDDEN,
      "Your account has been blocked. Please contact support."
    );
  }
  const submissions = await prisma.submission.findMany({
    where: {
      studentId: userId
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return submissions;
};
var getSingleSubmission = async (id, user) => {
  if (!id) {
    throw new AppError(status4.BAD_REQUEST, "Submission ID is required.");
  }
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      }
    }
  });
  if (!submission) {
    throw new AppError(status4.NOT_FOUND, "Submission not found.");
  }
  if (user?.role === Role.STUDENT && submission.studentId !== user.userId) {
    throw new AppError(
      status4.FORBIDDEN,
      "You do not have permission to view this submission."
    );
  }
  return submission;
};
var editSubmission = async (id, payload, user) => {
  if (!id) {
    throw new AppError(status4.BAD_REQUEST, "Submission ID is required.");
  }
  const submission = await prisma.submission.findUnique({
    where: { id }
  });
  if (!submission) {
    throw new AppError(status4.NOT_FOUND, "Submission not found.");
  }
  if (user && submission.studentId !== user.userId) {
    throw new AppError(
      status4.FORBIDDEN,
      "You do not have permission to edit this submission."
    );
  }
  if (submission.status !== SubmissionStatus.REJECTED) {
    throw new AppError(
      status4.BAD_REQUEST,
      `You can only edit a submission if its status is REJECTED. Current status: ${submission.status}.`
    );
  }
  if (!payload || Object.keys(payload).length === 0) {
    throw new AppError(
      status4.BAD_REQUEST,
      "Please provide at least one field to update."
    );
  }
  const finalRepoUrl = payload.repoUrl ? payload.repoUrl.trim() : submission.repoUrl;
  const finalLiveLink = payload.liveLink ? payload.liveLink.trim() : submission.liveLink;
  if (finalRepoUrl.toLowerCase() === finalLiveLink.toLowerCase()) {
    throw new AppError(
      status4.BAD_REQUEST,
      "Live link cannot be the same as the repository URL."
    );
  }
  if (payload.repoUrl && payload.repoUrl.trim() !== submission.repoUrl) {
    const existingRepo = await prisma.submission.findUnique({
      where: { repoUrl: payload.repoUrl.trim() }
    });
    if (existingRepo && existingRepo.id !== id) {
      throw new AppError(
        status4.CONFLICT,
        "A submission with this repository URL already exists."
      );
    }
  }
  const updatedSubmission = await prisma.submission.update({
    where: { id },
    data: {
      ...payload.projectName && { projectName: payload.projectName.trim() },
      ...payload.repoUrl && { repoUrl: payload.repoUrl.trim() },
      ...payload.liveLink && { liveLink: payload.liveLink.trim() },
      ...payload.description && { description: payload.description.trim() },
      status: SubmissionStatus.PENDING,
      reviewComment: null,
      reviewedAt: null,
      reviewedById: null
    }
  });
  return updatedSubmission;
};
var SubmissionService = {
  postSubmission,
  getMySubmissions,
  getSingleSubmission,
  editSubmission,
  updateSubmission: editSubmission
};

// src/module/submission/submission.controller.ts
import status5 from "http-status";
var postSubmission2 = catchAsync(
  async (req, res, _next) => {
    const user = req.user;
    const payload = req.body;
    const result = await SubmissionService.postSubmission(payload, user);
    return sendResponse(res, {
      success: true,
      statusCode: status5.CREATED,
      message: "Project submitted successfully.",
      data: result
    });
  }
);
var getMySubmissions2 = catchAsync(
  async (req, res, _next) => {
    const user = req.user;
    const result = await SubmissionService.getMySubmissions(
      user?.userId
    );
    return sendResponse(res, {
      success: true,
      statusCode: status5.OK,
      message: "My submissions retrieved successfully.",
      data: result
    });
  }
);
var getSingleSubmission2 = catchAsync(
  async (req, res, _next) => {
    const { id } = req.params;
    const user = req.user;
    const result = await SubmissionService.getSingleSubmission(
      id,
      user
    );
    return sendResponse(res, {
      success: true,
      statusCode: status5.OK,
      message: "Submission retrieved successfully.",
      data: result
    });
  }
);
var editSubmission2 = catchAsync(
  async (req, res, _next) => {
    const { id } = req.params;
    const user = req.user;
    const payload = req.body;
    const result = await SubmissionService.editSubmission(
      id,
      payload,
      user
    );
    return sendResponse(res, {
      success: true,
      statusCode: status5.OK,
      message: "Submission updated and resubmitted successfully.",
      data: result
    });
  }
);
var SubmissionController = {
  postSubmission: postSubmission2,
  getMySubmissions: getMySubmissions2,
  getSingleSubmission: getSingleSubmission2,
  editSubmission: editSubmission2,
  updateSubmission: editSubmission2
};

// src/module/submission/submission.validation.ts
import { z as z3 } from "zod";
var postSubmissionValidationSchema = z3.object({
  projectName: z3.string({ error: "Project name is required" }).min(1, "Project name cannot be empty").trim(),
  repoUrl: z3.string({ error: "Repository URL is required" }).url("Please provide a valid repository URL").trim(),
  liveLink: z3.string({ error: "Live link is required" }).url("Please provide a valid live link URL").trim(),
  description: z3.string({ error: "Description is required" }).min(1, "Description cannot be empty").trim(),
  studentId: z3.string({ error: "Student ID is required" }).min(1, "Student ID cannot be empty").trim()
});
var updateSubmissionValidationSchema = z3.object({
  projectName: z3.string().min(1, "Project name cannot be empty").trim().optional(),
  repoUrl: z3.string().url("Please provide a valid repository URL").trim().optional(),
  liveLink: z3.string().url("Please provide a valid live link URL").trim().optional(),
  description: z3.string().min(1, "Description cannot be empty").trim().optional()
});
var SubmissionValidation = {
  postSubmissionValidationSchema,
  createSubmissionValidationSchema: postSubmissionValidationSchema,
  updateSubmissionValidationSchema,
  editSubmissionValidationSchema: updateSubmissionValidationSchema
};

// src/module/submission/submission.route.ts
var router2 = Router2();
router2.post(
  "/",
  checkAuth(Role.STUDENT),
  validateRequest(SubmissionValidation.postSubmissionValidationSchema),
  SubmissionController.postSubmission
);
router2.get(
  "/my",
  checkAuth(Role.STUDENT),
  SubmissionController.getMySubmissions
);
router2.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.MENTOR, Role.STUDENT),
  SubmissionController.getSingleSubmission
);
router2.patch(
  "/:id",
  checkAuth(Role.STUDENT),
  validateRequest(SubmissionValidation.updateSubmissionValidationSchema),
  SubmissionController.editSubmission
);
var SubmissionRouter = router2;

// src/module/mentor/mentor.route.ts
import { Router as Router3 } from "express";

// src/module/mentor/mentor.service.ts
import bcrypt2 from "bcryptjs";
import status6 from "http-status";
var registerAsMentor = async (payload) => {
  const email = payload.email.trim().toLowerCase();
  const isUserExist = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isUserExist) {
    throw new AppError(
      status6.BAD_REQUEST,
      "User with this email already exists."
    );
  }
  const hashedPassword = await bcrypt2.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds || 10)
  );
  const mentor = await prisma.user.create({
    data: {
      name: payload.name.trim(),
      email,
      password: hashedPassword,
      role: Role.MENTOR,
      status: UserStatus.PENDING_APPROVAL,
      expertise: payload.expertise.trim(),
      bio: payload.bio.trim(),
      portfolioUrl: payload.portfolioUrl.trim()
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      expertise: true,
      bio: true,
      portfolioUrl: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return mentor;
};
var updateSubmissionStatus = async (submissionId, payload, mentorId) => {
  if (!submissionId) {
    throw new AppError(status6.BAD_REQUEST, "Submission ID is required.");
  }
  const mentor = await prisma.user.findUnique({
    where: { id: mentorId }
  });
  if (!mentor) {
    throw new AppError(status6.NOT_FOUND, "Mentor account not found.");
  }
  if (mentor.status !== UserStatus.ACTIVE) {
    throw new AppError(
      status6.FORBIDDEN,
      "Only active mentors can review and update submissions."
    );
  }
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId }
  });
  if (!submission) {
    throw new AppError(status6.NOT_FOUND, "Submission not found.");
  }
  if (submission.status === payload.status) {
    throw new AppError(
      status6.BAD_REQUEST,
      `Submission status is already ${payload.status}.`
    );
  }
  const comment = (payload.reviewComment || payload.rejectionReason || "").trim();
  if (payload.status === SubmissionStatus.REJECTED && !comment) {
    throw new AppError(
      status6.BAD_REQUEST,
      "Rejection reason is required when rejecting a submission."
    );
  }
  const updatedSubmission = await prisma.submission.update({
    where: { id: submissionId },
    data: {
      status: payload.status,
      reviewComment: comment || null,
      reviewedAt: /* @__PURE__ */ new Date(),
      reviewedById: mentorId
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      reviewedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          expertise: true
        }
      }
    }
  });
  return updatedSubmission;
};
var getAllSubmissions = async (query, mentorId) => {
  if (mentorId) {
    const mentor = await prisma.user.findUnique({
      where: { id: mentorId }
    });
    if (!mentor) {
      throw new AppError(status6.NOT_FOUND, "Mentor account not found.");
    }
    if (mentor.role === Role.MENTOR && mentor.status !== UserStatus.ACTIVE) {
      throw new AppError(
        status6.FORBIDDEN,
        "Only active mentors can access student submissions."
      );
    }
  }
  const whereConditions = {};
  if (query?.status) {
    whereConditions.status = query.status;
  }
  if (query?.studentId) {
    whereConditions.studentId = query.studentId;
  }
  if (query?.projectName) {
    whereConditions.projectName = {
      contains: query.projectName,
      mode: "insensitive"
    };
  }
  const submissions = await prisma.submission.findMany({
    where: whereConditions,
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      },
      reviewedBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          expertise: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return submissions;
};
var MentorServices = {
  registerAsMentor,
  updateSubmissionStatus,
  updateSubmissionSatus: updateSubmissionStatus,
  getAllSubmissions,
  getAllSubmission: getAllSubmissions
};

// src/module/mentor/mentor.controller.ts
import status7 from "http-status";
var registerAsMentor2 = catchAsync(
  async (req, res, _next) => {
    const payload = req.body;
    const result = await MentorServices.registerAsMentor(payload);
    return sendResponse(res, {
      success: true,
      statusCode: status7.CREATED,
      message: "Mentor registration application submitted successfully. Your account is pending admin approval.",
      data: result
    });
  }
);
var updateSubmissionStatus2 = catchAsync(
  async (req, res, _next) => {
    const { submissionId } = req.params;
    const user = req.user;
    const payload = req.body;
    const result = await MentorServices.updateSubmissionStatus(
      submissionId,
      payload,
      user?.userId
    );
    const actionMessage = payload.status === SubmissionStatus.APPROVED ? "Submission approved successfully." : "Submission rejected successfully.";
    return sendResponse(res, {
      success: true,
      statusCode: status7.OK,
      message: actionMessage,
      data: result
    });
  }
);
var getAllSubmissions2 = catchAsync(
  async (req, res, _next) => {
    const query = req.query;
    const user = req.user;
    const result = await MentorServices.getAllSubmissions(
      query,
      user?.userId
    );
    return sendResponse(res, {
      success: true,
      statusCode: status7.OK,
      message: "All submissions retrieved successfully.",
      data: result
    });
  }
);
var MentorController = {
  registerAsMentor: registerAsMentor2,
  updateSubmissionStatus: updateSubmissionStatus2,
  updateSubmissionSatus: updateSubmissionStatus2,
  getAllSubmissions: getAllSubmissions2,
  getAllSubmission: getAllSubmissions2
};

// src/module/mentor/mentor.validation.ts
import { z as z4 } from "zod";
var registerAsMentorValidationSchema = z4.object({
  name: z4.string({ error: "Name is required" }).min(1, "Name cannot be empty").trim(),
  email: z4.string({ error: "Email is required" }).email("Please provide a valid email address").trim(),
  password: z4.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
  expertise: z4.string({ error: "Expertise is required" }).min(1, "Expertise cannot be empty").trim(),
  bio: z4.string({ error: "Bio is required" }).min(1, "Bio cannot be empty").trim(),
  portfolioUrl: z4.string({ error: "Portfolio URL is required" }).url("Please provide a valid portfolio URL").trim()
});
var updateSubmissionStatusValidationSchema = z4.object({
  status: z4.enum(
    [SubmissionStatus.APPROVED, SubmissionStatus.REJECTED],
    {
      error: "Status must be either APPROVED or REJECTED"
    }
  ),
  reviewComment: z4.string().trim().optional(),
  rejectionReason: z4.string().trim().optional()
}).refine(
  (data) => {
    if (data.status === SubmissionStatus.REJECTED) {
      const comment = (data.reviewComment || data.rejectionReason || "").trim();
      return comment.length > 0;
    }
    return true;
  },
  {
    message: "Rejection reason is required when rejecting a submission.",
    path: ["reviewComment"]
  }
);
var MentorValidation = {
  registerAsMentorValidationSchema,
  updateSubmissionStatusValidationSchema,
  updateSubmissionSatusValidationSchema: updateSubmissionStatusValidationSchema
};

// src/module/mentor/mentor.route.ts
var router3 = Router3();
router3.post(
  "/register-as-mentor",
  validateRequest(MentorValidation.registerAsMentorValidationSchema),
  MentorController.registerAsMentor
);
router3.get(
  "/get-all-submissions",
  checkAuth(Role.MENTOR, Role.ADMIN),
  MentorController.getAllSubmissions
);
router3.put(
  "/update-submission-status/:submissionId",
  checkAuth(Role.MENTOR, Role.ADMIN),
  validateRequest(MentorValidation.updateSubmissionStatusValidationSchema),
  MentorController.updateSubmissionStatus
);
router3.patch(
  "/update-submission-status/:submissionId",
  checkAuth(Role.MENTOR, Role.ADMIN),
  validateRequest(MentorValidation.updateSubmissionStatusValidationSchema),
  MentorController.updateSubmissionStatus
);
var MentorRouter = router3;

// src/module/admin/admin.route.ts
import { Router as Router4 } from "express";

// src/module/admin/admin.service.ts
import status8 from "http-status";
var getAllMentors = async (query) => {
  const whereConditions = {
    role: Role.MENTOR
  };
  if (query?.status) {
    whereConditions.status = query.status;
  }
  const mentors = await prisma.user.findMany({
    where: whereConditions,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      expertise: true,
      bio: true,
      portfolioUrl: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          reviewsDone: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return mentors;
};
var getMentorById = async (mentorId) => {
  if (!mentorId) {
    throw new AppError(status8.BAD_REQUEST, "Mentor ID is required.");
  }
  const mentor = await prisma.user.findFirst({
    where: {
      id: mentorId,
      role: Role.MENTOR
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      expertise: true,
      bio: true,
      portfolioUrl: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true,
      reviewsDone: {
        select: {
          id: true,
          projectName: true,
          status: true,
          reviewedAt: true,
          reviewComment: true
        }
      }
    }
  });
  if (!mentor) {
    throw new AppError(status8.NOT_FOUND, "Mentor not found.");
  }
  return mentor;
};
var updateMentorStatus = async (mentorId, payload) => {
  if (!mentorId) {
    throw new AppError(status8.BAD_REQUEST, "Mentor ID is required.");
  }
  const mentor = await prisma.user.findFirst({
    where: {
      id: mentorId,
      role: Role.MENTOR
    }
  });
  if (!mentor) {
    throw new AppError(status8.NOT_FOUND, "Mentor not found.");
  }
  if (mentor.status === payload.status) {
    throw new AppError(
      status8.BAD_REQUEST,
      `Mentor status is already ${payload.status}.`
    );
  }
  if (payload.status === UserStatus.REJECTED) {
    if (!payload.rejectionReason || !payload.rejectionReason.trim()) {
      throw new AppError(
        status8.BAD_REQUEST,
        "Rejection reason is required when rejecting a mentor."
      );
    }
  }
  const updatedMentor = await prisma.user.update({
    where: { id: mentorId },
    data: {
      status: payload.status,
      rejectionReason: payload.status === UserStatus.REJECTED ? payload.rejectionReason?.trim() : null
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      expertise: true,
      bio: true,
      portfolioUrl: true,
      rejectionReason: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return updatedMentor;
};
var getDashboardStats = async () => {
  const [
    totalUsers,
    totalStudents,
    activeStudents,
    totalMentors,
    activeMentors,
    pendingMentors,
    rejectedMentors,
    blockedMentors,
    totalSubmissions,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: Role.STUDENT } }),
    prisma.user.count({
      where: { role: Role.STUDENT, status: UserStatus.ACTIVE }
    }),
    prisma.user.count({ where: { role: Role.MENTOR } }),
    prisma.user.count({
      where: { role: Role.MENTOR, status: UserStatus.ACTIVE }
    }),
    prisma.user.count({
      where: { role: Role.MENTOR, status: UserStatus.PENDING_APPROVAL }
    }),
    prisma.user.count({
      where: { role: Role.MENTOR, status: UserStatus.REJECTED }
    }),
    prisma.user.count({
      where: { role: Role.MENTOR, status: UserStatus.BLOCKED }
    }),
    prisma.submission.count(),
    prisma.submission.count({
      where: { status: SubmissionStatus.PENDING }
    }),
    prisma.submission.count({
      where: { status: SubmissionStatus.APPROVED }
    }),
    prisma.submission.count({
      where: { status: SubmissionStatus.REJECTED }
    })
  ]);
  return {
    users: {
      total: totalUsers,
      students: {
        total: totalStudents,
        active: activeStudents
      },
      mentors: {
        total: totalMentors,
        active: activeMentors,
        pendingApproval: pendingMentors,
        rejected: rejectedMentors,
        blocked: blockedMentors
      }
    },
    submissions: {
      total: totalSubmissions,
      pending: pendingSubmissions,
      approved: approvedSubmissions,
      rejected: rejectedSubmissions
    }
  };
};
var AdminServices = {
  getAllMentors,
  getMentorById,
  updateMentorStatus,
  getDashboardStats
};

// src/module/admin/admin.controller.ts
import status9 from "http-status";
var getAllMentors2 = catchAsync(
  async (req, res, _next) => {
    const query = req.query;
    const result = await AdminServices.getAllMentors(query);
    return sendResponse(res, {
      success: true,
      statusCode: status9.OK,
      message: "All mentors retrieved successfully.",
      data: result
    });
  }
);
var getMentorById2 = catchAsync(
  async (req, res, _next) => {
    const { mentorId } = req.params;
    const result = await AdminServices.getMentorById(mentorId);
    return sendResponse(res, {
      success: true,
      statusCode: status9.OK,
      message: "Mentor retrieved successfully.",
      data: result
    });
  }
);
var updateMentorStatus2 = catchAsync(
  async (req, res, _next) => {
    const { mentorId } = req.params;
    const payload = req.body;
    const result = await AdminServices.updateMentorStatus(
      mentorId,
      payload
    );
    const actionMessage = payload.status === UserStatus.ACTIVE ? "Mentor approved successfully." : payload.status === UserStatus.REJECTED ? "Mentor rejected successfully." : `Mentor status updated to ${payload.status} successfully.`;
    return sendResponse(res, {
      success: true,
      statusCode: status9.OK,
      message: actionMessage,
      data: result
    });
  }
);
var getDashboardStats2 = catchAsync(
  async (_req, res, _next) => {
    const result = await AdminServices.getDashboardStats();
    return sendResponse(res, {
      success: true,
      statusCode: status9.OK,
      message: "Admin dashboard stats retrieved successfully.",
      data: result
    });
  }
);
var AdminController = {
  getAllMentors: getAllMentors2,
  getMentorById: getMentorById2,
  updateMentorStatus: updateMentorStatus2,
  getDashboardStats: getDashboardStats2
};

// src/module/admin/admin.validation.ts
import { z as z5 } from "zod";
var updateMentorStatusValidationSchema = z5.object({
  status: z5.enum(
    [
      UserStatus.ACTIVE,
      UserStatus.REJECTED,
      UserStatus.BLOCKED,
      UserStatus.PENDING_APPROVAL
    ],
    {
      error: "Valid status is required (ACTIVE, REJECTED, BLOCKED, PENDING_APPROVAL)"
    }
  ),
  rejectionReason: z5.string().trim().optional()
}).refine(
  (data) => {
    if (data.status === UserStatus.REJECTED) {
      return typeof data.rejectionReason === "string" && data.rejectionReason.trim().length > 0;
    }
    return true;
  },
  {
    message: "Rejection reason is required when rejecting a mentor.",
    path: ["rejectionReason"]
  }
);
var AdminValidation = {
  updateMentorStatusValidationSchema
};

// src/module/admin/admin.route.ts
var router4 = Router4();
router4.get(
  "/stats",
  checkAuth(Role.ADMIN),
  AdminController.getDashboardStats
);
router4.get(
  "/get-all-mentors",
  checkAuth(Role.ADMIN),
  AdminController.getAllMentors
);
router4.get(
  "/get-mentors-by-id/:mentorId",
  checkAuth(Role.ADMIN),
  AdminController.getMentorById
);
router4.patch(
  "/update-mentor-status/:mentorId",
  checkAuth(Role.ADMIN),
  validateRequest(AdminValidation.updateMentorStatusValidationSchema),
  AdminController.updateMentorStatus
);
router4.put(
  "/update-mentor-status/:mentorId",
  checkAuth(Role.ADMIN),
  validateRequest(AdminValidation.updateMentorStatusValidationSchema),
  AdminController.updateMentorStatus
);
var AdminRouter = router4;

// src/app.ts
var app = express();
app.use(cors({
  origin: config.urls.backendUrl,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
var serverStartTime = /* @__PURE__ */ new Date();
app.get("/", (req, res) => {
  res.status(status10.OK).json({
    success: true,
    statusCode: status10.OK,
    message: "Welcome to the API! The server is up and running successfully.",
    data: {
      name: "Your API Name",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      status: "operational"
    },
    server: {
      startTime: serverStartTime.toISOString(),
      currentTime: (/* @__PURE__ */ new Date()).toISOString(),
      uptime: {
        seconds: Math.floor(process.uptime())
      }
    },
    author: {
      name: "Md. Sakib Hossen",
      role: "Full Stack Web Developer",
      github: "https://github.com/sakib404-hub",
      email: "akibhossainsakib1040@gmail.com"
    }
  });
});
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/submission", SubmissionRouter);
app.use("/api/v1/mentor", MentorRouter);
app.use("/api/v1/admin", AdminRouter);
app.use(globalErrorHandler);
app.use(notFound);
var app_default = app;

// src/utility/seed.ts
import bcrypt3 from "bcryptjs";
import status11 from "http-status";
var seedAdmin = async () => {
  try {
    await prisma.$transaction(async (tx) => {
      const isAdminExist = await tx.user.findFirst({
        where: {
          role: Role.ADMIN
        }
      });
      if (isAdminExist) {
        console.log("Admin Already Exists");
        return;
      }
      const name = config.admin.name;
      const email = config.admin.email;
      const password = config.admin.password;
      if (!email || !password || !name) {
        throw new AppError(status11.BAD_REQUEST, "Admin Email and Password is not found in the environment.");
      }
      const hashedPassword = await bcrypt3.hash(password, Number(config.bcrypt_salt_rounds));
      const admin = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: Role.ADMIN
        }
      });
      console.log("Admin Creation Successfull.");
    });
  } catch (err) {
    console.log("Error While Seeding Admin.");
  }
};

// src/server.ts
var PORT = config.port || 5e3;
var main = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected Successfully.");
    await seedAdmin();
    const server = app_default.listen(PORT, () => {
      console.log(`Server is Running on port : ${PORT}`);
    });
    server.on("error", (err) => {
      console.log("Server Failed with : ", err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error Strating the server : ", error);
    process.exit(1);
  }
};
main();
//# sourceMappingURL=server.js.map