import React from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import Alert from '../src/components/Alert'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('Alert', () => {

	it('should renders the shallow component', () => {
		let wrapper = shallow(<Alert />)
		expect(wrapper.length).toEqual(1)
	})

	it('should be null if no alert given', () => {
		let wrapper = shallow(<Alert />)
		expect(wrapper.type()).toEqual(null)
	})
})