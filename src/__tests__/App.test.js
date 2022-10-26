import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import App from "../App";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

it("should match the snapshot", () => {
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

describe("render without error", () => {
  it("should has time-button and time-display", () => {
    expect(wrapper.find(".time-button")).toHaveLength(1);
    expect(wrapper.find(".time-display")).toHaveLength(1);
  });

  it("time start is zero", () => {
    expect(wrapper.find(".time-button h2").text()).toBe("0");
  });

  it("do not have list record when start", () => {
    expect(wrapper.find(".time-display").text()).toBe("Your time record:");
  });
});

describe("start button", () => {
  // fake time
  jest.useFakeTimers();

  it("time should up when click start button", () => {
    const startBtn = wrapper.find("button.startBtn");
    startBtn.simulate("click");

    // fake setTimeout
    jest.advanceTimersByTime(2000);

    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("2");
  });
});

describe("reset button", () => {
  jest.useFakeTimers();

  it("time should return zero when click reset", () => {
    const startBtn = wrapper.find("button.startBtn");
    const resetBtn = wrapper.find("button.resetBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(4000);

    resetBtn.simulate("click");
    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("0");
  });
});

describe("pause button", () => {
  jest.useFakeTimers();

  it("time pause when click pause button", () => {
    const startBtn = wrapper.find("button.startBtn");
    const pauseBtn = wrapper.find("button.pauseResumeBtn");
    const recordBtn = wrapper.find("button.recordBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(2000);

    pauseBtn.simulate("click");

    jest.advanceTimersByTime(3000);
    recordBtn.simulate("click");
    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("2");
  });
});

describe("record button", () => {
  jest.useFakeTimers();

  it("get recordList when click record button", () => {
    const startBtn = wrapper.find("button.startBtn");
    const recordBtn = wrapper.find("button.recordBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(3000);

    const recordBtnClick_times = 5;
    for (let i = 0; i < recordBtnClick_times; i++) {
      recordBtn.simulate("click");
    }
    const recordList = wrapper.find(".time-display li");
    expect(recordList).toHaveLength(recordBtnClick_times);
  });

  it("get right value when first click record button", () => {
    const startBtn = wrapper.find("button.startBtn");
    const recordBtn = wrapper.find("button.recordBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(7000);

    recordBtn.simulate("click");
    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("7");
    const recordList = wrapper.find(".time-display li");
    expect(recordList).toHaveLength(1);
  });

  it("get right value when click pause and reset one times", () => {
    const startBtn = wrapper.find("button.startBtn");
    const pauseResumeBtn = wrapper.find("button.pauseResumeBtn");
    const recordBtn = wrapper.find("button.recordBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(2000);

    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(4000);
    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(1000);

    recordBtn.simulate("click");
    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("3");
    const recordList = wrapper.find(".time-display li");
    expect(recordList).toHaveLength(1);
  });

  it("get right value when click pause and reset two times", () => {
    const startBtn = wrapper.find("button.startBtn");
    const pauseResumeBtn = wrapper.find("button.pauseResumeBtn");
    const recordBtn = wrapper.find("button.recordBtn");
    startBtn.simulate("click");

    jest.advanceTimersByTime(2000);

    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(4000);
    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(1000);

    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(3000);
    pauseResumeBtn.simulate("click");
    jest.advanceTimersByTime(2000);

    recordBtn.simulate("click");
    const time = wrapper.find(".time-button h2").text();
    expect(time).toBe("5");
    const recordList = wrapper.find(".time-display li");
    expect(recordList).toHaveLength(1);
  });
});
