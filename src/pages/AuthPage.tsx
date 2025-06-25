
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wind, User, Mail, Lock, Building, IdCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cleanupAuthState, testSupabaseConnection } from "@/utils/authUtils";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerDepartment, setRegisterDepartment] = useState("");
  const [registerEmployeeId, setRegisterEmployeeId] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await testSupabaseConnection();
      setConnectionStatus(isConnected);
      if (!isConnected) {
        toast({
          title: "Connection Issue",
          description: "Having trouble connecting to authentication service. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    checkConnection();
  }, [toast]);

  const logSuccessfulLogin = async (userId: string, userEmail: string) => {
    try {
      const userAgent = navigator.userAgent;
      const { error } = await supabase
        .from('login_logs')
        .insert({
          user_id: userId,
          user_email: userEmail,
          user_agent: userAgent
        });
      
      if (error) {
        console.error('Failed to log login:', error);
        // Don't show error to user as this is internal logging
      }
    } catch (error) {
      console.error('Error logging login:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('=== LOGIN ATTEMPT ===');
      console.log('Email:', loginEmail);
      
      cleanupAuthState();
      
      try {
        console.log('Attempting global sign out before login...');
        await supabase.auth.signOut({ scope: 'global' });
      } catch (signOutError) {
        console.log('Sign out error (continuing anyway):', signOutError);
      }
      
      console.log('Initiating sign in with password...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('Login error details:', {
          message: error.message,
          status: error.status,
          code: error.code || 'no-code'
        });
        
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and ensure your browser allows connections to Supabase.');
        } else if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the confirmation link before logging in.');
        } else {
          throw error;
        }
      }

      if (data.user) {
        console.log('Login successful for user:', data.user.email);
        console.log('Session created:', !!data.session);
        
        // Log the successful login
        await logSuccessfulLogin(data.user.id, data.user.email!);
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        console.log('Redirecting to home page...');
        window.location.href = "/";
      }
    } catch (error: any) {
      console.error('Login failed with error:', error);
      
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('=== REGISTRATION ATTEMPT ===');
      console.log('Email:', registerEmail);
      
      cleanupAuthState();
      
      const redirectUrl = `${window.location.origin}/`;
      console.log('Using redirect URL:', redirectUrl);
      
      console.log('Initiating sign up...');
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: registerName,
            department: registerDepartment,
            employee_id: registerEmployeeId,
          },
        },
      });

      console.log('Sign up response:', { data, error });

      if (error) {
        console.error('Registration error details:', {
          message: error.message,
          status: error.status,
          code: error.code || 'no-code'
        });
        
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and ensure your browser allows connections to Supabase.');
        } else if (error.message.includes('User already registered')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        } else if (error.message.includes('Password should be at least 6 characters')) {
          throw new Error('Password must be at least 6 characters long.');
        } else {
          throw error;
        }
      }

      if (data.user) {
        console.log('Registration successful for user:', data.user.email);
        console.log('Session created:', !!data.session);
        console.log('Email confirmation required:', !data.session);
        
        if (!data.session) {
          toast({
            title: "Registration successful",
            description: "Please check your email for a confirmation link, then try logging in.",
          });
        } else {
          // Log the successful login if automatically signed in
          await logSuccessfulLogin(data.user.id, data.user.email!);
          
          toast({
            title: "Registration successful",
            description: "Your account has been created and you are now logged in!",
          });
          console.log('Redirecting to home page...');
          window.location.href = "/";
          return;
        }
        
        // Clear registration form and switch to login
        setRegisterName("");
        setRegisterDepartment("");
        setRegisterEmployeeId("");
        setRegisterEmail("");
        setRegisterPassword("");
        setLoginEmail(registerEmail);
        setActiveTab("login");
      }
    } catch (error: any) {
      console.error('Registration failed with error:', error);
      
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-lg w-fit">
            <Wind className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">Playbook Portal</CardTitle>
            <CardDescription className="text-gray-600">
              Access playbooks and project execution guides
            </CardDescription>
            {connectionStatus === false && (
              <div className="text-red-600 text-sm mt-2">
                ⚠️ Connection issue detected
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  disabled={isLoading || connectionStatus === false}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-employee-id">Employee ID</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="register-employee-id"
                      type="text"
                      placeholder="Enter your employee ID"
                      value={registerEmployeeId}
                      onChange={(e) => setRegisterEmployeeId(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-10"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  disabled={isLoading || connectionStatus === false}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
