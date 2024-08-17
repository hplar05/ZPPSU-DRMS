import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Camera } from "lucide-react";
import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import Logo from "@/public/logo.jpg";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Hero = async () => {
  const session = await getServerSession(authOptions);
  return (
    <Section className="border-b">
      <Container className="flex flex-col items-center text-center">
        <Image
          src={Logo}
          width={172}
          height={72}
          alt="Company Logo"
          className="not-prose mb-6 dark:invert md:mb-8"
        />
        <h1 className="!mb-0">
          <Balancer>Zamboanga Peninsula Polytechnic State University</Balancer>
        </h1>
        <h3 className="text-muted-foreground">
          <Balancer>
            Unlock your academic potential by requesting your personalized
            subject form today. Whether you're looking to explore new subjects
            or need guidance on your current studies, we're here to help you
            make the best choices for your educational journey.
          </Balancer>
        </h3>
        <div className="not-prose mt-6 flex gap-2 md:mt-12">
          <Button asChild>
            <Link href={session?.user ? "/user" : "/login"}>
              Get Started -{">"}
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
