import { Mail, AlertTriangle, Clock, Truck, Phone, DollarSign, FileText, Calendar } from "lucide-react";

export const notifications = [
  { id: "1", text: "Hey, not coming in today. Feeling sick.", icon: Mail },
  { id: "2", text: "OVERDUE: Invoice #4421 - 14 days past due", icon: AlertTriangle },
  { id: "3", text: "Client cancelled - 2 hours notice", icon: Clock },
  { id: "4", text: "Hey it's Mike, the van won't start so...", icon: Truck },
  { id: "5", text: "Quick question before you jump on that call", icon: Phone },
  { id: "6", text: "Payment of $14,200 pending review", icon: DollarSign },
  { id: "7", text: "Running 20 mins late to the site", icon: Clock },
  { id: "8", text: "Supplier price increase effective immediately", icon: FileText },
  { id: "9", text: "Tax filing deadline in 3 days", icon: Calendar },
  { id: "10", text: "Can you call me when you get a sec?", icon: Phone },
  { id: "11", text: "RE: Your review response needed", icon: Mail },
  { id: "12", text: "The client is asking for an update on the job", icon: FileText },
];
