import React from 'react';
import chai, { expect } from 'chai';
import chaiJestSnapshot from 'chai-jest-snapshot';
import enzymeToJson from 'enzyme-to-json';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateFolder from './createfolder';

chai.use(chaiJestSnapshot);

Enzyme.configure({ adapter: new Adapter() });

function noop() {}


it('works', () => {
    const wrapper = shallow(<CreateFolder pollUpdateMode={noop} folder="/home/foo" />); //Väljer komponenten
    expect(wrapper.find(".upload-folder-button")).to.have.lengthOf(1); //Checkar så att komponenten har en knapp. WOo!
});

it('matches snapshot', () => {
    const wrapper = shallow(<CreateFolder pollUpdateMode={noop} folder="/home/foo" />); //Väljer komponenten
    expect(enzymeToJson(wrapper)).to.matchSnapshot(); //Tar ett snapshot. Om något läggs till i komponenten, t.ex. en knapp, så tar den ett nytt snapshot, och jämför med det gamla snapshotet. Om något ändrats (t.ex. lagt till en knapp) så ger testet fail.
});

it("shows modal", () => {
    const wrapper = shallow(<CreateFolder pollUpdateMode={noop} folder="/home/foo" />); //Väljer komponenten
    expect(wrapper.find(".upload-modal-folder").prop("style").display).to.equal("none"); //Checkar om style.displays värde är "none"
    
    wrapper.find(".upload-folder-button").simulate("click"); //Simulerar ett klick på komponenten
    expect(wrapper.find(".upload-modal-folder").prop("style").display).to.equal("block"); //Checkar att style.displays värde efter det simulerade klicket är "block".
})

it ("Input sets state which sets value", () => {
    const wrapper = shallow(<CreateFolder pollUpdateMode={noop} folder="/home/foo" />); //Väljer komponenten
    expect(wrapper.find(".upload-folder-input").prop("value")).to.equal(""); //Checkar att inputfältet först är tomt.
    
    wrapper.find(".upload-folder-input").simulate("change", {target: {value: "Test"}}); //Simulerar en onChange och sätter value till "Test". Value är i komponenten statet "input".
    expect(wrapper.find(".upload-folder-input").prop("value")).to.equal("Test"); //Checkar att value faktiskt blivit "Test".
})


var sinon = require('sinon');


it('should call update(true) once', function() {
    var pollUpdateMode = sinon.spy();
    const wrapper = shallow(<CreateFolder pollUpdateMode={pollUpdateMode} folder="/home/foo" />);
    wrapper.find(".upload-folder-button").simulate("click");
    expect(pollUpdateMode.calledWith(true)).to.be.true;
  });

  it('should call update(false) once', function() {
    var pollUpdateMode = sinon.spy();
    const wrapper = shallow(<CreateFolder pollUpdateMode={pollUpdateMode} folder="/home/foo" />);
    wrapper.find(".upload-folder-button").simulate("click");
    wrapper.find("#testi").simulate("click");
    expect(pollUpdateMode.calledWith(false)).to.be.true;
  });