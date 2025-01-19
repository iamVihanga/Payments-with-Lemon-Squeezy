import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "@/features/admin/components/users-table";

export default async function ManageUsers() {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Manage Users</CardTitle>
        <CardDescription>
          View and manage all users in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable />
      </CardContent>
    </Card>
  );
}
