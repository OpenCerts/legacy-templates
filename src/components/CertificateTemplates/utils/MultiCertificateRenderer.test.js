import React from "react";
import { shallow, mount } from "enzyme";
import MultiCertificateRenderer from "./MultiCertificateRenderer";

const Template1 = () => <div>Template 1</div>;
const Template2 = () => <div>Template 2</div>;

const mockCertificateTemplates = [
  { id: "template1", template: Template1 },
  { id: "template2", template: Template2 }
];

const mockUpdateParentTemplates = jest.fn();
const mockObfuscateDocument = jest.fn();
const mockCertificate = {
  id: "mockCert",
  description: "Mock Cert",
  issuers: [{ certificateStore: "mockStore" }]
};
const mockInvalidWhiteList = ["whitelist"];
const mockValidWhiteList = ["mockStore"];

it("update functions are executed on mount", () => {
  mount(
    <MultiCertificateRenderer
      templates={mockCertificateTemplates}
      tabIndex={1}
      document={mockCertificate}
      updateParentTemplates={mockUpdateParentTemplates}
      whitelist={mockValidWhiteList}
      obfuscateDocument={mockObfuscateDocument}
    />
  );

  expect(mockUpdateParentTemplates).toHaveBeenCalled();
});

it("returns InvalidCertificateNotice if whitelist is wrong", () => {
  const component = shallow(
    <MultiCertificateRenderer
      templates={mockCertificateTemplates}
      tabIndex={0}
      document={mockCertificate}
      updateParentTemplates={mockUpdateParentTemplates}
      whitelist={mockInvalidWhiteList}
    />
  );
  expect(component.find("InvalidCertificateNotice").length).toBe(1);
});

it("returns SelectedTemplateTab if whitelist is correct", () => {
  const component = shallow(
    <MultiCertificateRenderer
      templates={mockCertificateTemplates}
      tabIndex={1}
      document={mockCertificate}
      updateParentTemplates={mockUpdateParentTemplates}
      whitelist={mockValidWhiteList}
      obfuscateDocument={mockObfuscateDocument}
    />
  );

  const SelectedTemplate = component.find(Template2);
  expect(SelectedTemplate.exists()).toBe(true);
  expect(SelectedTemplate.prop("certificate")).toEqual(mockCertificate);
  expect(SelectedTemplate.prop("handleObfuscation")).toEqual(
    mockObfuscateDocument
  );
});
