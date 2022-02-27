import Controller from "./Controller";

describe("Controller", () => {
  let controller: Controller;

  beforeEach(() => {
    controller = new Controller();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  // ──────────────────────────────────────────────────────────────
  //   :::::: D E F I N E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  it("Controller should be defined", () => {
    expect(controller).toBeDefined();
  });

  // ──────────────────────────────────────────────────────────────
  //   :::::: L O G G E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  it("Controller.logger() should log", () => {
    const logSpy = jest.spyOn(console, "log");

    controller.logger();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith("Log from Controller");
  });
});
