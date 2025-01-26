import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubscriptionButton } from "./subscription-button";

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  actionButton?: React.ReactNode;
}

export function PlanCard({
  name,
  price,
  description,
  features,
  popular = false,
  actionButton,
}: PricingPlanProps) {
  const regex = /(<([^>]+)>)/gi;

  return (
    <Card className={popular ? "border-primary" : ""}>
      <CardHeader>
        <CardTitle className="font-heading flex items-center justify-between">
          {name}
          {popular && <Badge variant="secondary">Most Popular</Badge>}
        </CardTitle>
        <CardDescription>{description.replace(regex, "")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && (
            <span className="text-muted-foreground ml-1">/month</span>
          )}
        </div>
        <ul className="space-y-2 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {actionButton}

        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
