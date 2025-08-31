import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upgrade to Pro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Faster generations</li>
            <li>Higher quality outputs</li>
            <li>Access to premium styles</li>
          </ul>
          <div className="grid md:grid-cols-3 gap-3">
            <Plan title="Basic Pack" price="₹100" desc="1 Image" />
            <Plan title="Starter Pack" price="₹700" desc="10 Images" />
            <Plan title="Weekly Creator Pack" price="₹1500" desc="30 Images" highlight />
          </div>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">Proceed to Checkout</Button>
        </CardContent>
      </Card>
    </div>
  )
}

function Plan({ title, price, desc, highlight }: { title: string; price: string; desc: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-blue-600" : ""}`}>
      <div className="font-medium">{title}</div>
      <div className="text-2xl font-semibold mt-1">{price}</div>
      <div className="text-sm text-muted-foreground">{desc}</div>
    </div>
  )
}
