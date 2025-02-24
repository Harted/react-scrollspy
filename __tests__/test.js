import test from 'ava'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom';
import { configure, shallow } from 'enzyme'
import Scrollspy from '../src/js/lib/scrollspy'

configure({ adapter: new Adapter() })

test.beforeEach(() => {
  global.window = new JSDOM().window
  global.document = new JSDOM().window.document
})

test('renders correct children length', (t) => {
  const wrapper = shallow(
    <Scrollspy items={['section-1', 'section-2', 'section-3']} currentClassName="is-current">
      <li className=""><a href="#section-1">section 1</a></li>
      <li className=""><a href="#section-2">section 2</a></li>
      <li className=""><a href="#section-3">section 3</a></li>
    </Scrollspy>
  )
  t.is(wrapper.find('li').length, 3)
})

test('renders children with correct props', (t) => {
  const wrapper = shallow(
    <Scrollspy items={['section-1']} currentClassName="is-current">
      <li className="" randomProp="someText"><a href="#section-1">section 1</a></li>
    </Scrollspy>
  )
  t.is(wrapper.find('li').prop('randomProp'), 'someText')
})

test('renders expected html tag', (t) => {
  const defaultTag = shallow(<Scrollspy />)
  const customTag = shallow(<Scrollspy componentTag={'div'}></Scrollspy>)

  t.is(defaultTag.type(), 'ul')
  t.is(customTag.type(), 'div')
})

test('renders expected React Component', (t) => {
  const MyComponent = () => { }
  const customTag = shallow(<Scrollspy componentTag={MyComponent}></Scrollspy>)

  t.is(customTag.type(), MyComponent)
})
