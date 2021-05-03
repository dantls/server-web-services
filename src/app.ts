import express from "express";

import {createServer} from 'http';

import "./database";

import 'reflect-metadata';

import cors from 'cors';

import routes from "./routes";

const app = express();

const http = createServer(app); //Separando o protocolo http do express

app.use(cors());
app.use(express.json());

app.use(routes);

export default http