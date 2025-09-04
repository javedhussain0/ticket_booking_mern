import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        About Our Ticket Booking System 🎟️
      </Typography>

      {/* Mission */}
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Our mission is to make ticket booking seamless, secure, and reliable for
        both riders and admins.
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="stretch"
        gap={3}
        flexWrap="wrap"
        sx={{ mb: 6 }}
      >
        {[
          { title: "10K+", subtitle: "Tickets Booked" },
          { title: "500+", subtitle: "Verified Riders" },
          { title: "99%", subtitle: "Secure Transactions" },
        ].map((stat, index) => (
          <Card key={index} sx={{ flex: "1 1 250px", textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {stat.title}
              </Typography>
              <Typography color="text.secondary">{stat.subtitle}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Divider sx={{ my: 6 }} />

      <Typography variant="h5" gutterBottom fontWeight="bold">
        Terms & Conditions
      </Typography>

      {[
        {
          title: "1. Booking Policy",
          content:
            "All bookings are confirmed only after successful payment. Please ensure correct details while booking.",
        },
        {
          title: "2. Cancellation & Refund",
          content:
            "Cancellations are allowed up to 24 hours before the ride. Refunds will be processed within 5-7 business days.",
        },
        {
          title: "3. Rider Responsibilities",
          content:
            "Riders must carry a valid ticket/QR code and follow safety guidelines during travel.",
        },
        {
          title: "4. Admin Rights",
          content:
            "Admins reserve the right to deny bookings in case of policy violations or system misuse.",
        },
      ].map((item, index) => (
        <Accordion key={index} sx={{ boxShadow: 1, mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Divider sx={{ my: 6 }} />

      <Typography variant="h5" gutterBottom fontWeight="bold">
        Frequently Asked Questions (FAQ)
      </Typography>

      {[
        {
          q: "How do I book a ticket?",
          a: "Simply log in, choose your destination and time, select your seat, and complete the payment. You’ll receive a confirmation instantly.",
        },
        {
          q: "Can I cancel my ticket?",
          a: "Yes, tickets can be cancelled up to 24 hours before the scheduled ride. Refunds are processed within 5-7 business days.",
        },
        {
          q: "How do I get my refund?",
          a: "Refunds are sent to the same payment method used for booking. You’ll get an email once the refund is initiated.",
        },
        {
          q: "Do I need to carry a physical ticket?",
          a: "No, you can simply show your digital ticket or QR code on the app at the boarding point.",
        },
        {
          q: "Is my payment information secure?",
          a: "Absolutely. We use industry-standard encryption and secure gateways to protect all payment data.",
        },
      ].map((faq, index) => (
        <Accordion key={index} sx={{ boxShadow: 1, mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      <Divider sx={{ my: 6 }} />

      <Box textAlign="center">
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Need Help?
        </Typography>
        <Typography color="text.secondary">
          Reach us at{" "}
          <Link href="mailto:support@ticketapp.com" color="primary">
            support@ticketapp.com
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
