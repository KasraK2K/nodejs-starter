import Controller from "./Controller";

describe("Controller", () => {
  let controller: Controller;

  beforeEach(() => {
    controller = new Controller();
  });

  // ──────────────────────────────────────────────────────────────
  //   :::::: D E F I N E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  // ──────────────────────────────────────────────────────────────
  //   :::::: L O G G E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────
  it("Logger", () => {
    const logSpy = jest.spyOn(console, "log");

    controller.logger();
    expect(console.log).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Log from Controller");

    logSpy.mockRestore();
    logSpy.mockClear();
    logSpy.mockReset();
  });
});
