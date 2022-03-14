import { CronJob } from "cron";

let cycle = 1;
const maxCycles = 3;

const sampleJob = new CronJob(
  "* * * * * *",
  function () {
    console.log(`LOG SAMPLE JOB CYCLE ${cycle}/${maxCycles}`);
    if (cycle++ === maxCycles) sampleJob.stop();
  },
  null,
  true,
  "America/Los_Angeles"
);
sampleJob.start();

export default sampleJob;
