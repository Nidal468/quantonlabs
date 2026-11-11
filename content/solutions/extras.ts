/* Per-industry layout variants and industry questions.
   Answers restate governed facts (STRATEGIC VISION, FAQ, QL OVERVIEW) in industry terms. */

export interface SolutionExtras {
  /** Hero photo on the left. */
  flip: boolean;
  /** Breaks as a card grid or as ruled rows. */
  breaks: "grid" | "rows";
  /** Order card on the left of the walkthrough. */
  traceFlip: boolean;
  faq: [string, string][];
}

const KEEP =
  "A platform that is working well can stay connected to the operational core and remain the record for its function until the company chooses to move it. Services a specialist handles better, such as payment processing, tax computation, payroll filing, bank and card feeds, and phone and email, stay connected permanently.";

export const EXTRAS: Record<string, SolutionExtras> = {
  "manufacturing-distribution": {
    flip: false, breaks: "grid", traceFlip: false,
    faq: [
      ["Does Quanton OS replace the accounting and inventory systems a plant already runs?", "They are consolidated onto the operational core, with opening balances plus two years of history migrated by default. Existing platforms stay connected during the build and are retired as each function goes live. " + KEEP],
      ["Can trading partners exchange purchase orders and invoices directly?", "Yes, when the partner also runs Quanton OS. Purchase orders, acknowledgments, delivery notices, invoices, remittances, and change orders move as signed messages. Each connection starts by invitation, both sides confirm it, and every inbound message is held for confirmation before it touches the record."],
      ["How long does a deployment take for a manufacturer?", "Phase 1 Discovery and Diagnostic takes two weeks for a base footprint. Phase 2 builds the operational core and takes 8 to 16 weeks for most footprints, with functions coming online progressively. Multi-entity footprints are scheduled in the Phase 2 scope."],
    ],
  },
  "home-services": {
    flip: true, breaks: "rows", traceFlip: true,
    faq: [
      ["Does Quanton OS replace field service software?", "The schedule, the dispatch board, the customer record, and the books are consolidated onto one operational core the company owns, with records migrated. " + KEEP],
      ["How do technicians use it in the field?", "Through the worker mobile app: clock in and out, the daily task list, photos and reports from the job, pay stubs, and time off requests. It works offline and syncs when connected. Photos are of the work only."],
      ["What happens to calls and messages that arrive after hours?", "After-hours intake is always on: web chat, an automated email and text acknowledgment, and a priority notification to the team. An AI voice agent is available as a configured option."],
    ],
  },
  "trade-contractors": {
    flip: false, breaks: "rows", traceFlip: false,
    faq: [
      ["Do subcontractor crews need an app or an account?", "No. Crews work by text: an assignment text, a start-day text, and a completion text, each with a link to the job. What a crew can do through the link is limited to the punch list, and every action is written to the audit trail. Any free-form message to a crew and any crew payment waits for approval."],
      ["How are insurance certificates and licenses tracked?", "As commitments on the record. Each date is confirmed by a person against the source document, then tracked. A lapse before a start date holds the assignment, and actions on tracked commitments always wait for explicit approval."],
      ["Can pay applications come from the field?", "Pay applications are built from areas accepted at walkthrough, with retainage tracked to the dollar. Invoices are prepared and presented, and nothing is sent to the general contractor until leadership approves it."],
    ],
  },
  "professional-services": {
    flip: true, breaks: "grid", traceFlip: true,
    faq: [
      ["How is work outside the signed scope handled?", "Hours and budget are tracked against the signed scope as time posts. A request that falls outside it reaches the President with the hours, the margin impact, and a change order drafted for approval. Proposals and pricing changes always wait for explicit approval."],
      ["Can the firm see capacity before the next proposal goes out?", "Yes. The forward view covers cash, capacity, and demand, computed from the record: who is booked, for how long, and what the pipeline will need."],
      ["What happens to client knowledge when people leave?", "It stays. Every engagement, document, and decision lives on the record the firm owns, so the next person starts with the full history instead of a handoff conversation."],
    ],
  },
  automotive: {
    flip: false, breaks: "grid", traceFlip: true,
    faq: [
      ["Is added work ever done without the customer's approval?", "No. Estimates for added work are prepared from current rates and presented, and nothing proceeds until the work is approved. Quotes and free-form customer messages always wait for explicit approval."],
      ["Does Quanton OS replace shop management software?", "Bookings, bays, parts, repair orders, and the books are consolidated onto one operational core the shop owns, with records migrated. " + KEEP],
      ["How do technicians record inspections?", "On the worker mobile app, with photos and notes captured against the repair order. Photos are of the work only; a photo with a person in frame is rejected at capture."],
    ],
  },
  "healthcare-wellness": {
    flip: true, breaks: "rows", traceFlip: false,
    faq: [
      ["Is Quanton OS a fit for a practice that handles patient health information?", "Sometimes, and it requires a compliance review before scoping. Regulated data handling brings platform-level obligations that have to be resolved or explicitly excluded before an engagement begins. Quanton Labs says directly if part of an operation cannot be covered responsibly."],
      ["How are late cancellations filled?", "The cancellation is checked against the waitlist, matched clients are offered the slot from an approved template, and the offers go out after a review window unless someone steps in."],
      ["How are provider licenses and credentials tracked?", "Every renewal date is confirmed against the source document and tracked as a commitment. Reminders escalate from the act-by date, actions always wait for explicit approval, and a missed date becomes an exception routed to the right person."],
    ],
  },
  retail: {
    flip: false, breaks: "rows", traceFlip: true,
    faq: [
      ["How does the record stay matched to the shelf?", "Cycle counts post against the record. When they disagree, the reorder is held and the gap is routed with the sell-through behind it, so nothing is reordered against stock that is not there."],
      ["Does it work across more than one store?", "Yes. Every transaction carries its location, so stock, sales, and margin are read by store and across the company, and transfers between stores are proposed from the record."],
      ["Do we keep our point of sale?", "Sales, stock, purchasing, and the books are consolidated onto one operational core the company owns. " + KEEP],
    ],
  },
};
