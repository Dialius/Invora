import test from 'node:test';
import assert from 'node:assert';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './auth';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret-key-12345!';

test('authenticateToken middleware', async (t) => {
  await t.test('should return 401 if no token is provided', () => {
    let statusCalledWith = 0;
    let jsonCalledWith = {};
    let nextCalled = false;

    const req = {
      headers: {},
      cookies: {}
    } as unknown as Request;

    const res = {
      status: (code: number) => {
        statusCalledWith = code;
        return {
          json: (data: any) => {
            jsonCalledWith = data;
          }
        };
      }
    } as unknown as Response;

    const next = () => {
      nextCalled = true;
    };

    authenticateToken(req, res, next);

    assert.strictEqual(statusCalledWith, 401);
    assert.deepStrictEqual(jsonCalledWith, { error: 'Access token required' });
    assert.strictEqual(nextCalled, false);
  });

  await t.test('should return 403 if token is invalid', () => {
    let statusCalledWith = 0;
    let jsonCalledWith = {};
    let nextCalled = false;

    const req = {
      headers: {
        authorization: 'Bearer invalid-token'
      },
      cookies: {}
    } as unknown as Request;

    const res = {
      status: (code: number) => {
        statusCalledWith = code;
        return {
          json: (data: any) => {
            jsonCalledWith = data;
          }
        };
      }
    } as unknown as Response;

    const next = () => {
      nextCalled = true;
    };

    authenticateToken(req, res, next);

    assert.strictEqual(statusCalledWith, 403);
    assert.deepStrictEqual(jsonCalledWith, { error: 'Invalid or expired token' });
    assert.strictEqual(nextCalled, false);
  });

  await t.test('should call next and set req.user if token is valid', () => {
    let nextCalled = false;
    const payload = { id: 'user-123', email: 'test@example.com', name: 'Test User' };
    const token = jwt.sign(payload, JWT_SECRET);

    const req = {
      headers: {
        authorization: `Bearer ${token}`
      },
      cookies: {}
    } as unknown as Request;

    const res = {} as unknown as Response;

    const next = () => {
      nextCalled = true;
    };

    authenticateToken(req, res, next);

    assert.strictEqual(nextCalled, true);
    assert.ok(req.user);
    assert.strictEqual(req.user.id, payload.id);
    assert.strictEqual(req.user.email, payload.email);
    assert.strictEqual(req.user.name, payload.name);
  });
});
