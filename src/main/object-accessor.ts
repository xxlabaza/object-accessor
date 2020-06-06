
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

import { Result, failure, success } from '@xxlabaza/result';

export class ObjectAccessor {

  constructor (private object: {[key in string]: any}) {}

  getString (path: string): Result<string, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }
    return typeof value === 'string' || value instanceof String
           ? success(value as string) // eslint-disable-line indent
           : failure(new Error(`the value by path '${path}' is not a string`)); // eslint-disable-line indent
  }

  getNumber (path: string): Result<number, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    if (typeof value !== 'number') {
      return failure(new Error(`the value by path '${path}' is not a number`));
    } else if (value !== Number(value)) {
      return failure(new Error(`the value by path '${path}' is NaN`));
    } if (value === Infinity || value === -Infinity) {
      return failure(new Error(`the value by path '${path}' is Infinity`));
    }
    return success(value as number);
  }

  getInteger (path: string): Result<number, Error> {
    const result = this.getNumber(path);
    if (result.isFailure()) {
      return result;
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }
    return Number.isInteger(value)
           ? success(value) // eslint-disable-line indent
           : failure(new Error(`the value by path '${path}' is not an integer value`)); // eslint-disable-line indent
  }

  getFloat (path: string): Result<number, Error> {
    const result = this.getNumber(path);
    if (result.isFailure()) {
      return result;
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }
    return Number.isInteger(value)
           ? failure(new Error(`the value by path '${path}' is not a float value`)) // eslint-disable-line indent
           : success(value); // eslint-disable-line indent
  }

  getArray<T> (path: string): Result<T[], Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    if (typeof value !== 'object') {
      return failure(new Error(`the value by path '${path}' is not an array, but ${typeof value}`));
    } else if (value.constructor !== Array) {
      return failure(new Error(`the value by path '${path}' is not an array, but ${value.constructor}`));
    }
    return success(value as T[]);
  }

  getObject (path: string): Result<object, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    if (typeof value !== 'object') {
      return failure(new Error(`the value by path '${path}' is not an object, but ${typeof value}`));
    } else if (value.constructor !== Object) {
      return failure(new Error(`the value by path '${path}' is not an object, but ${value.constructor}`));
    }
    return success(value as object);
  }

  getObjectAccessor (path: string): Result<ObjectAccessor, Error> {
    const result = this.getObject(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    return value === undefined
           ? success(undefined) // eslint-disable-line indent
           : success(new ObjectAccessor(value)); // eslint-disable-line indent
  }

  getBoolean (path: string): Result<boolean, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    return typeof value === 'boolean'
           ? success(value as boolean) // eslint-disable-line indent
           : failure(new Error(`the value by path '${path}' is not a boolean, but ${typeof value}`)); // eslint-disable-line indent
  }

  getDate (path: string): Result<Date, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    return value instanceof Date
           ? success(value as Date) // eslint-disable-line indent
           : failure(new Error(`the value by path '${path}' is not a Date, but ${value}`)); // eslint-disable-line indent
  }

  getSymbol (path: string): Result<symbol, Error> {
    const result = this.get(path);
    if (result.isFailure()) {
      return failure(result.error);
    }

    const value = result.value;
    if (value === undefined || value === null) {
      return success(value);
    }

    return typeof value === 'symbol'
           ? success(value as symbol) // eslint-disable-line indent
           : failure(new Error(`the value by path '${path}' is not a Symbol, but ${typeof value}`)); // eslint-disable-line indent
  }

  private get (path: string): Result<any, Error> {
    const tokens = path.split('.');
    if (!tokens || tokens.length <= 0) {
      return failure(new Error('empty path'));
    }

    let result = this.object;
    for (let index = 0, length = tokens.length - 1; index < length; index++) {
      const token = tokens[index];
      if (result[token] === undefined) {
        const path = tokens.slice(0, index + 1).join('.');
        return failure(new Error(`nonexistent path '${path}' in object ${JSON.stringify(this.object)}`));
      }
      result = result[token];
    }

    const lastToken = tokens[tokens.length - 1];
    result = result[lastToken];
    return result === undefined
           ? failure(new Error('no value')) // eslint-disable-line indent
           : success(result); // eslint-disable-line indent
  }
}
