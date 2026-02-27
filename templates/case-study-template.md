# GenAI System Design — Case Study Template

A 9-step framework for GenAI system design, with three levels of detail.

---

## Level 1: The Pipeline

```
Why GenAI? → Requirements → Architecture → Data Strategy → Model Selection → Inference Infra → Guardrails → Evaluation → Deploy & Monitor
```

---

## Level 2: Sub-topics

| Step | Sub-topics |
|------|------------|
| **0. Why GenAI?** | Generative vs discriminative · Cost justification · Hybrid alternatives |
| **1. Requirements** | Latency SLO · Cost budget · Privacy constraints · Scale numbers |
| **2. Architecture** | API vs RAG vs Fine-tune vs Agents · System diagram |
| **3. Data Strategy** | Knowledge base · Retrieval pipeline · Prompt engineering · Eval dataset · Context enrichment |
| **4. Model Selection** | Foundation model choice · Fine-tune vs ICL · Multi-model routing |
| **5. Inference Infra** | Serving framework · Batching · KV cache · GPU provisioning · Autoscaling |
| **6. Guardrails** | Input filtering · Output validation · Fallback behavior |
| **7. Evaluation** | Offline metrics · Online metrics · Human eval · A/B testing |
| **8. Deploy & Monitor** | Cost/query · Latency optimization · Observability · Drift detection |

---

## Level 3: Talking Points

### 0. Why GenAI?

- **Generative vs discriminative**: Is the output open-ended text, or a label/score? If a classifier solves it, skip the LLM.
- **Cost justification**: LLM call ~$0.01/query. XGBoost ~$0.000001. At 10M queries/month, that's $100K vs $10.
- **Hybrid**: Route simple queries to a lookup/classifier, send only complex ones to the LLM.

### 1. Requirements

- **Latency**: Can users wait 2-5s for streaming? Or need sub-100ms?
- **Cost**: What's the per-query budget? This determines model tier.
- **Privacy**: Can data leave your infra? If not, self-hosted models only.
- **Scale**: QPS now and in 6 months. This shapes everything.

### 2. Architecture

- **API-only**: Fastest to ship, highest per-query cost, least control.
- **RAG**: Retrieve → stuff context → generate. Best for knowledge-heavy tasks.
- **Fine-tune**: When prompting can't teach the behavior you need.
- **Agents**: Only when multi-step reasoning or tool use is required. Know when NOT to.
- **System diagram**: Draw the high-level flow. Components, data paths, external dependencies.

### 3. Data Strategy

- **3a. Knowledge base**: What sources? Update cadence? Coverage gaps?
- **3b. Retrieval pipeline**: Chunking strategy, embedding model, vector store, hybrid search + reranking.
- **3c. Prompt engineering**: System prompt design, few-shot examples, versioning & rollback.
- **3d. Eval dataset**: Ground truth pairs, edge cases, adversarial inputs. Without this, you can't measure anything.
- **3e. Context enrichment**: User-specific data at query time (order status, account tier, session history). The GenAI equivalent of an online feature store.

### 4. Model Selection

- **Foundation model**: GPT-4o vs Claude vs Gemini vs open-source (Llama, Mistral). Cost/quality/latency trade-off.
- **Fine-tune vs ICL**: Fine-tuning = better quality, higher upfront cost. ICL = flexible, no training, token-heavy.
- **Multi-model routing**: Cheap model for simple queries, expensive model for hard ones. Router decides.

### 5. Inference Infrastructure

- **Serving framework**: vLLM, TGI, TensorRT-LLM. Continuous batching is table stakes.
- **KV cache management**: PagedAttention for memory efficiency. Prefix caching for shared system prompts.
- **GPU provisioning**: How many GPUs, what type (A100 vs H100), tensor parallelism for large models.
- **Autoscaling**: Scale on QPS or GPU utilization? Cold start latency for new replicas.
- **Disaggregated inference**: Separate prefill and decode pools when workloads have mixed prompt lengths.

### 6. Guardrails & Safety

- **Input filtering**: Prompt injection detection, PII scrubbing before it hits the model.
- **Output validation**: Hallucination detection via retrieval grounding. Structured output enforcement via logit masking.
- **Fallback behavior**: "I don't know" > hallucination. Escalate to human when confidence is low.

### 7. Evaluation

- **Offline metrics**: Retrieval recall, factual accuracy, ROUGE for summarization.
- **Online metrics**: Task completion rate, user thumbs up/down, session length.
- **Human eval**: Often the gold standard for open-ended generation. Expensive but necessary.
- **A/B testing**: Compare prompt versions, model versions, retrieval strategies side by side.

### 8. Deployment & Monitoring

- **Cost**: $/query breakdown (model, retrieval, compute). Where to cut first.
- **Latency optimization**: Cache frequent queries, stream responses, batch where possible.
- **Observability**: Log prompts + responses + retrieval results for debugging.
- **Drift detection**: Retrieval quality degradation, model behavior shifts over time, embedding staleness.

---

## How to Use This Template

**For writing a case study post**: Walk through Steps 0-8 in order. Skip steps that don't apply (e.g., skip Step 5 Agents if the system doesn't need them). Go deep on 2-3 steps that are most interesting for the specific problem.

**For reading**: Level 1 gives you the structure at a glance. Level 2 tells you what each step covers. Level 3 gives you the actual content to discuss.

**Cross-linking**: Reference concept posts as deep dives. Example: "We use PagedAttention for KV cache management — [see the deep dive](/blog/paged-attention)."
