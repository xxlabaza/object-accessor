
/*
 * Copyright 2020 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ObjectAccessor } from '../main';

const myObject = {
  'key1': 'Hello world!',
  'key2': 42,
  'key3': {
    'key4': [
      1,
      2,
      3
    ]
  }
};

it('#1', () => {
  const accessor = new ObjectAccessor(myObject);
  expect(accessor.getString('key1').orError()).toEqual('Hello world!');
});

it('#2', () => {
  const accessor = new ObjectAccessor(myObject);
  expect(accessor.getInteger('key2').orError()).toBe(42);
});

it('#3', () => {
  const accessor = new ObjectAccessor(myObject);
  expect(accessor.getArray('key3.key4').orError()).toEqual([1, 2, 3]);
});

it('#4', () => {
  const accessor = new ObjectAccessor(myObject);
  expect(accessor.getObject('key3').orError()).toEqual({ 'key4': [1, 2, 3] });
});

it('#5', () => {
  const accessor = new ObjectAccessor(myObject);
  const anotherAccessor = accessor.getObjectAccessor('key3').orError();
  expect(anotherAccessor === null).toBe(false);
  expect(anotherAccessor === undefined).toBe(false);
  expect(anotherAccessor.getArray('key4').orError()).toEqual([1, 2, 3]);
});

it('#6', () => {
  const accessor = new ObjectAccessor(myObject);
  expect(accessor.getString('key42').isFailure()).toBe(true);
});
