import { Avatar } from "@/src/components/ui/Avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { PublicUser } from "../types/user.types";


export function PublicProfileCard({ user }: { user: PublicUser }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar
          firstName={user.firstName}
          lastName={user.lastName}
          avatarUrl={user.avatarUrl}
          size="lg"
        />
        <div>
          <CardTitle>
            {user.firstName} {user.lastName}
          </CardTitle>
          <CardDescription>{user.bio ?? 'No bio yet.'}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        Member since {new Date(user.createdAt).toLocaleDateString()}
      </CardContent>
    </Card>
  );
}
