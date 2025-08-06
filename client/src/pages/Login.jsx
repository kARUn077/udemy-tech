import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2, Wand2, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;

    if (type === "signup") {
      if (!inputData.name || !inputData.email || !inputData.password) {
        toast.error("Please fill in all magical fields.");
        return;
      }
    } else {
      if (!inputData.email || !inputData.password) {
        toast.error("Wand movements incomplete! Fill both fields.");
        return;
      }
    }

    try {
      const action = type === "signup" ? registerUser : loginUser;
      await action(inputData);
    } catch (error) {
      toast.error("A spell backfired! Try again.");
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Magical account created!");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Enchantment failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Welcome back, wizard!");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Portkey malfunction");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#2d0b59] p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Wand2 className="h-8 w-8 text-[#9d4edd]" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#9d4edd] to-[#5a189a] bg-clip-text text-transparent">
              LEARNWIZ
            </h1>
          </div>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#0d0519] border border-[#3d1e6d]">
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-[#7b2cbf] data-[state=active]:text-white"
            >
              Signup
            </TabsTrigger>
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-[#7b2cbf] data-[state=active]:text-white"
            >
              Login
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup">
            <Card className="border-[#3d1e6d] bg-[#0d0519]">
              <CardHeader>
                <CardTitle className="text-[#e0aaff]">Magical Signup</CardTitle>
                <CardDescription className="text-[#c77dff]">
                  Begin your wizarding journey here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#e0aaff]">Wizard Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Albus Dumbledore"
                    className="bg-[#1a0b2e] border-[#3d1e6d] text-white focus-visible:ring-[#9d4edd]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#e0aaff]">Owl Post Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="albus@hogwarts.edu"
                    className="bg-[#1a0b2e] border-[#3d1e6d] text-white focus-visible:ring-[#9d4edd]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#e0aaff]">Secret Spell</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="••••••••"
                    className="bg-[#1a0b2e] border-[#3d1e6d] text-white focus-visible:ring-[#9d4edd]"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full bg-[#7b2cbf] hover:bg-[#9d4edd]"
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Casting Signup Spell...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" /> 
                      Enroll at Hogwarts
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="login">
            <Card className="border-[#3d1e6d] bg-[#0d0519]">
              <CardHeader>
                <CardTitle className="text-[#e0aaff]">Wizard Login</CardTitle>
                <CardDescription className="text-[#c77dff]">
                  Return to your magical studies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#e0aaff]">Owl Post Address</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="albus@hogwarts.edu"
                    className="bg-[#1a0b2e] border-[#3d1e6d] text-white focus-visible:ring-[#9d4edd]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#e0aaff]">Secret Spell</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="••••••••"
                    className="bg-[#1a0b2e] border-[#3d1e6d] text-white focus-visible:ring-[#9d4edd]"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full bg-[#7b2cbf] hover:bg-[#9d4edd]"
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Apparating...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" /> 
                      Enter the Great Hall
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <p className="text-center text-[#c77dff] mt-6">
          From Platform 9¾ to Magical Knowledge
        </p>
      </div>
    </div>
  );
};

export default Login;