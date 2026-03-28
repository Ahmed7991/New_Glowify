'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signUp } = useAuth();

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState('');

  // Sign Up state
  const [signUpFullName, setSignUpFullName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  // Get error from URL params (from callback redirect)
  const urlError = searchParams.get('error');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    // Validation
    if (!signInEmail || !signInPassword) {
      setSignInError('Please fill in all fields');
      return;
    }

    if (signInPassword.length < 6) {
      setSignInError('Password must be at least 6 characters');
      return;
    }

    setSignInLoading(true);

    const { error } = await signIn(signInEmail, signInPassword);

    if (error) {
      setSignInError(error.message);
      setSignInLoading(false);
    } else {
      // Successful sign in - redirect to account page
      router.push('/account');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    setSignUpSuccess(false);

    // Validation
    if (!signUpEmail || !signUpPassword || !signUpConfirmPassword) {
      setSignUpError('Please fill in all required fields');
      return;
    }

    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpEmail)) {
      setSignUpError('Please enter a valid email address');
      return;
    }

    setSignUpLoading(true);

    const { error } = await signUp(signUpEmail, signUpPassword, signUpFullName);

    setSignUpLoading(false);

    if (error) {
      setSignUpError(error.message);
    } else {
      setSignUpSuccess(true);
      // Clear form
      setSignUpFullName('');
      setSignUpEmail('');
      setSignUpPassword('');
      setSignUpConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-gold/20 via-baby-blue/20 to-rose-gold/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-playfair text-rose-gold">Welcome to Glowify</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>
        <CardContent>
          {urlError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {urlError}
            </div>
          )}

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {signInError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {signInError}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-rose-gold hover:bg-deep-rose text-white"
                  disabled={signInLoading}
                >
                  {signInLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-fullname">Full Name (Optional)</Label>
                  <Input
                    id="signup-fullname"
                    type="text"
                    placeholder="Jane Doe"
                    value={signUpFullName}
                    onChange={(e) => setSignUpFullName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500">Minimum 6 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                {signUpError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {signUpError}
                  </div>
                )}

                {signUpSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-700 text-sm">
                    Account created successfully! Please check your email to verify your account.
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-rose-gold hover:bg-deep-rose text-white"
                  disabled={signUpLoading}
                >
                  {signUpLoading? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-gold/20 via-baby-blue/20 to-rose-gold/20">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-rose-gold" />
        </div>
      </div>
    }>
      <LoginPageContent />
    </Suspense>
  );
}
