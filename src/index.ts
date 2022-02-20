import os from "os";
import express from "express";
import { Express, Request, Response } from "express";

class Application {
  public app: Express;
  private port: Number;

  constructor(options: { port: Number }) {
    const { port } = options;
    this.app = express();
    this.port = Number(process.env.PORT) || port;
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded());
    this.app.disable("x-powered-by");
  }

  private routes() {
    // this.app.use("/", indexRouter);
    this.app.get("/", (req: Request, res: Response) => {
      res.send({ message: "hello world" });
    });
  }

  private information() {
    // Server Information
    console.group("Server Information:");
    console.table([
      {
        Port: this.port,
        NODE_ENV: process.env.NODE_ENV,
        Platform: os.platform(),
        "CPU Model": os.cpus()[0].model,
        Arch: os.arch(),
      },
    ]);
    console.groupEnd();
    // CPU/Ram Information
    console.group("\nCPU/Ram Information:");
    console.table([
      {
        "CPU Count": os.cpus().length,
        "CPU Speed": os.cpus()[0].speed,
        "Total Memory": os.totalmem(),
        "Free Memory": os.freemem(),
        "Used Memory": os.totalmem() - os.freemem(),
      },
    ]);
    console.groupEnd();
    // Node Information
    console.group("\nNode Information:");
    console.table([
      {
        "Node PID": process.pid,
        "Node CPU Usage": process.cpuUsage(),
        "Node Version": process.version,
        "Node Exec Path": process.execPath,
      },
    ]);
    console.groupEnd();
    console.info(`\nServer running on http://localhost:${this.port}`);
  }

  public init() {
    this.middlewares();
    this.routes();

    this.app.listen(this.port, () => this.information());
  }
}

const server = new Application({ port: 3000 });
server.init();
