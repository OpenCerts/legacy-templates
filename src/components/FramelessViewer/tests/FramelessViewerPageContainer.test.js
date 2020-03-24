import React from "react";
import { shallow } from "enzyme";
import FramelessViewerPageContainer from "../FramelessViewerPageContainer";

jest.mock("../FramelessCertificateViewer", () => jest.fn());

it("returns false because of certificateContentsString", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.isEmptyRender()).toBe(false);
});

it("initialise window methods on mount if connected to parent and inIframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  window.opencerts.renderDocument("NEW_CERTIFICATE");
  expect(component.state("document")).toBe("NEW_CERTIFICATE");

  component.instance().selectTemplateTab(2);
  expect(component.state("tabIndex")).toBe(2);
});

it("does not initialise connection to parent not in iframe on mount", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  expect(component.state("parentFrameConnection")).toBe(null);
});

it("sets certificate state when handleDocumentChange is called", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().handleDocumentChange("CERTIFICATE");
  expect(component.state("document")).toBe("CERTIFICATE");
});

it("does not crash when selectTemplateTab is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().selectTemplateTab(5);
});

it("does not crash when updateParentTemplateTabs is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().updateParentTemplates("TABS");
});

it("does not crash when updateParentHeight is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().updateParentHeight();
});

it("does not crash when updateParentTemplates is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().updateParentTemplates();
});

it("does not crash when obfuscateDocument is called when not in iframe", () => {
  const component = shallow(<FramelessViewerPageContainer />);
  component.instance().obfuscateDocument();
});
