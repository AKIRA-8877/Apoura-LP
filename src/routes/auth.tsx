import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteLayout } from "@/components/client/SiteLayout";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { tab?: "signin" | "signup" | undefined } => ({ tab: s["tab"] === "signup" ? "signup" : undefined }),
  head: () => ({
    meta: [
      { title: "Sign In or Sign Up — Apoura" },
      { name: "description", content: "Sign in or create your Apoura account to plan, track and execute your event." },
      { property: "og:title", content: "Sign In or Sign Up — Apoura" },
      { property: "og:description", content: "Create your Apoura client, vendor or organiser account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { tab } = Route.useSearch();
  return (
    <SiteLayout>
      <section className="section auth-section">
        <Tabs defaultValue={tab ?? "signin"} className="auth-card">
          <TabsList className="w-full"><TabsTrigger value="signin" className="flex-1">Sign In</TabsTrigger><TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger></TabsList>
          <TabsContent value="signin" className="booking-form">
            <label>Email<input type="email" /></label>
            <label>Password<input type="password" /></label>
            <Button disabled>Sign In</Button>
          </TabsContent>
          <TabsContent value="signup" className="booking-form">
            <label>I am a<select><option>Client planning an event</option><option>Vendor</option><option>Event organiser</option></select></label>
            <label>Email<input type="email" /></label>
            <label>Password<input type="password" /></label>
            <Button disabled>Create account</Button>
          </TabsContent>
          <p className="auth-note">Accounts are coming soon.</p>
        </Tabs>
      </section>
    </SiteLayout>
  );
}
