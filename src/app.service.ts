import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { WorkerPath } from './config';
@Injectable()
export class AppService {
  blocking(cpuTimeMs: number) {
    const startTime = Date.now();
    while(Date.now() - startTime < cpuTimeMs){}
    return "finished"
  }
  worker(cpuTimeMs: number) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(WorkerPath, {workerData: {cpuTimeMs}});
      worker.on("message", (msg => {
        resolve(msg);
      }))
      worker.on("error", (err) => {
        reject(err);
      });
      worker.on("exit", (code) => {
        console.log("Worker did exit with code: ", code);
        
      })
    })
  }
}
