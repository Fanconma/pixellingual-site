import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-pixel mb-6">联系我们</h1>
          <p className="text-muted-foreground mb-8">
            Have questions about our translations? Want to contribute to our project? Or just want to say hello? We'd
            love to hear from you!
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">Email</h3>
                <p className="text-muted-foreground">contact@pixellingual.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">Location</h3>
                <p className="text-muted-foreground">Shanghai, China</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-pixel text-lg">Discord</h3>
                <p className="text-muted-foreground">Join our Discord server: PixelLingual</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-pixel mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-pixel text-lg">How can I contribute to translations?</h3>
                <p className="text-muted-foreground">
                  We welcome contributions from bilingual speakers! Please contact us with your experience and we'll
                  guide you through our contributor onboarding process.
                </p>
              </div>

              <div>
                <h3 className="font-pixel text-lg">
                  Are your translations compatible with the latest Minecraft version?
                </h3>
                <p className="text-muted-foreground">
                  We strive to keep our translations up-to-date with the latest Minecraft Bedrock Edition. Each
                  translation pack page indicates the compatible versions.
                </p>
              </div>

              <div>
                <h3 className="font-pixel text-lg">Can I request a specific map or mod to be translated?</h3>
                <p className="text-muted-foreground">
                  Yes! We take translation requests and prioritize them based on community interest. Please use the
                  contact form to submit your request.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="minecraft-card p-8">
            <h2 className="text-2xl font-pixel mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="font-pixel text-sm">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-pixel text-sm">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-pixel text-sm">
                  Subject
                </label>
                <Input id="subject" placeholder="What is this regarding?" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-pixel text-sm">
                  Message
                </label>
                <Textarea id="message" placeholder="Your message" rows={6} />
              </div>

              <Button type="submit" className="minecraft-btn w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div className="mt-8 minecraft-card p-8">
            <h2 className="text-2xl font-pixel mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Connect with other Minecraft enthusiasts and translators in our community platforms.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Discord
              </Button>
              <Button variant="outline" className="w-full">
                GitHub
              </Button>
              <Button variant="outline" className="w-full">
                Twitter
              </Button>
              <Button variant="outline" className="w-full">
                Reddit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

