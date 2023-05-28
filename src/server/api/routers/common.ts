import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface LastYearContributionProps {
  totalContributions: number;
}

export const commonRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),

  lastYearContribution: publicProcedure
    .input(z.object({ usrName: z.string() }))
    .query(async ({input}) => {
      const profile_url =
        `https://github-contributions-api.deno.dev/${input.usrName}.json`;

      const allContributionData = await (await fetch(profile_url)).json();
      const formatedAllContributionData: LastYearContributionProps =
        allContributionData;
      return formatedAllContributionData.totalContributions;
    }),
});
