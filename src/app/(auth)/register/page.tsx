'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validate(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim() || name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';

  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Please enter a valid email address.';

  if (password.length < 8)
    errors.password = 'Password must be at least 8 characters.';
  else if (!/[A-Z]/.test(password))
    errors.password = 'Must contain at least one uppercase letter.';
  else if (!/[0-9]/.test(password))
    errors.password = 'Must contain at least one number.';

  if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  return errors;
}

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Password strength indicator */
  const strength = (() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  })();

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength] ?? '';
  const strengthColor = [
    '',
    'bg-red-500',
    'bg-amber-500',
    'bg-yellow-400',
    'bg-emerald-500',
  ][strength] ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');

    const errors = validate(name, email, password, confirmPassword);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? 'Registration failed. Please try again.');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch {
      setServerError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Account created!</h2>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          Redirecting you to sign in…
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-[#A1A1AA]">
          Start building with Aether AI for free
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form id="register-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="register-name" className="text-sm font-medium text-[#D4D4D8]">
            Full name
          </Label>
          <Input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => { setName(e.target.value); setFieldErrors(p => ({ ...p, name: undefined })); }}
            disabled={loading}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            className={`h-11 border-white/10 bg-white/5 text-white placeholder:text-[#52525B] transition-colors
              focus-visible:ring-sky-500/50 focus-visible:border-sky-500/50
              ${fieldErrors.name ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}`}
          />
          {fieldErrors.name && (
            <p id="name-error" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />{fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="register-email" className="text-sm font-medium text-[#D4D4D8]">
            Email address
          </Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: undefined })); }}
            disabled={loading}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className={`h-11 border-white/10 bg-white/5 text-white placeholder:text-[#52525B] transition-colors
              focus-visible:ring-sky-500/50 focus-visible:border-sky-500/50
              ${fieldErrors.email ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />{fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="register-password" className="text-sm font-medium text-[#D4D4D8]">
            Password
          </Label>
          <div className="relative">
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Min. 8 chars, 1 uppercase, 1 number"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: undefined })); }}
              disabled={loading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'password-error' : 'password-hint'}
              className={`h-11 pr-11 border-white/10 bg-white/5 text-white placeholder:text-[#52525B] transition-colors
                focus-visible:ring-sky-500/50 focus-visible:border-sky-500/50
                ${fieldErrors.password ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}`}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#A1A1AA] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength bar */}
          {password.length > 0 && (
            <div id="password-hint" className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i <= strength ? strengthColor : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-[#71717A]">
                Strength:{' '}
                <span
                  className={
                    strength === 1
                      ? 'text-red-400'
                      : strength === 2
                      ? 'text-amber-400'
                      : strength === 3
                      ? 'text-yellow-400'
                      : 'text-emerald-400'
                  }
                >
                  {strengthLabel}
                </span>
              </p>
            </div>
          )}

          {fieldErrors.password && (
            <p id="password-error" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />{fieldErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <Label htmlFor="register-confirm" className="text-sm font-medium text-[#D4D4D8]">
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="register-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors(p => ({ ...p, confirmPassword: undefined })); }}
              disabled={loading}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? 'confirm-error' : undefined}
              className={`h-11 pr-11 border-white/10 bg-white/5 text-white placeholder:text-[#52525B] transition-colors
                focus-visible:ring-sky-500/50 focus-visible:border-sky-500/50
                ${fieldErrors.confirmPassword ? 'border-red-500/50 focus-visible:ring-red-500/30' : ''}`}
            />
            <button
              type="button"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#A1A1AA] transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p id="confirm-error" className="text-xs text-red-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />{fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          id="register-submit"
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 bg-sky-500 hover:bg-sky-400 text-white font-medium rounded-lg shadow-lg shadow-sky-500/20 transition-all duration-200 hover:shadow-sky-500/30 hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Create account
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-[#52525B]">Already have an account?</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <p className="text-center text-sm text-[#A1A1AA]">
        Already a member?{' '}
        <Link
          href="/login"
          id="goto-login"
          className="font-medium text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-4"
        >
          Sign in instead
        </Link>
      </p>
    </>
  );
}
