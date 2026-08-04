# Repository extraction runbook

Status: Conceptual
Audience: Technical Lead and Future Repository Owners

See [../README.md](../README.md).

Do not execute this runbook until extraction is approved.

## Safe Process

1. Approve extraction decision.
2. Define source and destination ownership.
3. Freeze boundary changes temporarily.
4. Identify exact files.
5. Preserve Git history where practical.
6. Create destination CI.
7. Configure environments.
8. Publish or expose contracts.
9. Update consumers.
10. Run contract and integration tests.
11. Deploy in controlled order.
12. Monitor.
13. Remove old source only after validation.
14. Update documentation and ownership.

## Non-goals

- Do not create repositories from this document alone.
- Do not copy source folders manually as an ongoing integration strategy.
- Do not create a desktop/mobile split while extracting.
