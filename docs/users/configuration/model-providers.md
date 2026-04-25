# Model Providers

Qwen Code allows you to configure multiple model providers through the `modelProviders` setting in your `settings.json`. This enables you to switch between different AI models and providers using the `/model` command.

## Overview

Use `modelProviders` to declare curated model lists per auth type that the `/model` picker can switch between. Keys must be valid auth types (`openai`, `anthropic`, `gemini`, etc.). Each entry requires an `id` and **must include `envKey`**, with optional `name`, `description`, `baseUrl`, and `generationConfig`. Credentials are never persisted in settings; the runtime reads them from `process.env[envKey]`. Qwen OAuth models remain hard-coded and cannot be overridden.

> [!note]
>
> Only the `/model` command exposes non-default auth types. Anthropic, Gemini, etc., must be defined via `modelProviders`. The `/auth` command lists Qwen OAuth, Alibaba Cloud Coding Plan, and API Key as the built-in authentication options.

> [!warning]
>
> **Duplicate model IDs within the same authType:** Defining multiple models with the same `id` under a single `authType` (e.g., two entries with `"id": "gpt-4o"` in `openai`) is currently not supported. If duplicates exist, **the first occurrence wins** and subsequent duplicates are skipped with a warning. Note that the `id` field is used both as the configuration identifier and as the actual model name sent to the API, so using unique IDs (e.g., `gpt-4o-creative`, `gpt-4o-balanced`) is not a viable workaround. This is a known limitation that we plan to address in a future release.

## 🚀 Future Roadmap: Android CLI 2026 AI

> [!important]
> **Coming in 2026**: Native Android CLI support with built-in AI skills!

Qwen Code is expanding to mobile platforms with full Android CLI support planned for 2026. This will include:

### Android CLI 2026 Features

- **Native Android Terminal Integration**: Run Qwen Code directly on Android devices via Termux or native Android terminal
- **Built-in AI Skills**: Pre-configured skills optimized for mobile development
  - 📱 Android Development Assistant
  - 🎨 UI/UX Design Helper
  - 🔋 Battery Optimization Advisor
  - 📡 Network Debugging Tool
  - 🧪 Mobile Testing Assistant
- **On-Device Inference**: Support for running local models on Android NPUs
- **Cross-Platform Sync**: Seamless synchronization between desktop and mobile configurations
- **Touch-Optimized UI**: Mobile-first interface for the `/model` and `/skill` commands

### Planned Android-Specific Providers

```json
{
  "modelProviders": {
    "openai": [
      {
        "id": "qwen-mobile-optimized",
        "name": "Qwen Mobile Optimized",
        "envKey": "DASHSCOPE_API_KEY",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "capabilities": {
          "mobileOptimized": true,
          "lowLatency": true,
          "offlineSupport": false
        },
        "generationConfig": {
          "timeout": 30000,
          "maxRetries": 2,
          "samplingParams": {
            "temperature": 0.3,
            "max_tokens": 2048
          }
        }
      }
    ]
  }
}
```

> [!note]
> Android CLI 2026 will ship with all major providers pre-configured and ready to use out of the box. No manual configuration required!

## Built-in Skills

Qwen Code comes with a comprehensive set of built-in skills that enhance your development workflow. Skills are located in `/workspace/packages/core/src/skills/bundled/` and can be extended via extensions.

### Core Bundled Skills

| Skill Name | Description | Location |
|------------|-------------|----------|
| `review` | Code review assistant with intelligent suggestions | `/packages/core/src/skills/bundled/review/` |
| `loop` | Iterative refinement and loop optimization | `/packages/core/src/skills/bundled/loop/` |
| `qc-helper` | Quality control and code quality helper | `/packages/core/src/skills/bundled/qc-helper/` |

### Skill Configuration

Skills can be configured in your `settings.json`:

```json
{
  "skills": {
    "enabled": ["review", "loop", "qc-helper"],
    "customSkills": []
  }
}
```

### Using Skills

Activate skills via the `/skill` command:

```bash
/skill review
/skill loop
/skill qc-helper
```

> [!tip]
> Visit `/workspace/packages/cli/src/commands/extensions/examples/skills/` for examples on creating custom skills.

## Configuration Examples by Auth Type

Below are comprehensive configuration examples for different authentication types, showing the available parameters and their combinations.

### Supported Auth Types

The `modelProviders` object keys must be valid `authType` values. Currently supported auth types are:

| Auth Type    | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `openai`     | OpenAI-compatible APIs (OpenAI, Azure OpenAI, local inference servers like vLLM/Ollama) |
| `anthropic`  | Anthropic Claude API                                                                    |
| `gemini`     | Google Gemini API                                                                       |
| `qwen-oauth` | Qwen OAuth (hard-coded, cannot be overridden in `modelProviders`)                       |

> [!warning]
> If an invalid auth type key is used (e.g., a typo like `"openai-custom"`), the configuration will be **silently skipped** and the models will not appear in the `/model` picker. Always use one of the supported auth type values listed above.

### Popular OpenAI-Compatible Providers

The `openai` auth type supports a wide range of providers. Below is a comprehensive list of popular providers you can configure:

| Provider        | Base URL                                              | Environment Variable   | Description                              |
| --------------- | ----------------------------------------------------- | ---------------------- | ---------------------------------------- |
| OpenAI          | `https://api.openai.com/v1`                           | `OPENAI_API_KEY`       | Official OpenAI API                      |
| DashScope       | `https://dashscope.aliyuncs.com/compatible-mode/v1`   | `DASHSCOPE_API_KEY`    | Alibaba Cloud DashScope (Qwen models)    |
| DeepSeek        | `https://api.deepseek.com/v1`                         | `DEEPSEEK_API_KEY`     | DeepSeek AI models                       |
| OpenRouter      | `https://openrouter.ai/api/v1`                        | `OPENROUTER_API_KEY`   | Aggregated model provider                |
| ModelScope      | `https://api-inference.modelscope.cn/v1`              | `MODELSCOPE_API_KEY`   | Alibaba ModelScope platform              |
| Groq            | `https://api.groq.com/openai/v1`                      | `GROQ_API_KEY`         | Fast inference with LPU                  |
| Fireworks AI    | `https://api.fireworks.ai/inference/v1`               | `FIREWORKS_API_KEY`    | High-performance inference               |
| Together AI     | `https://api.together.xyz/v1`                         | `TOGETHER_API_KEY`     | Open-source model hosting                |
| Mistral         | `https://api.mistral.ai/v1`                           | `MISTRAL_API_KEY`      | Mistral AI models                        |
| Perplexity      | `https://api.perplexity.ai`                           | `PERPLEXITY_API_KEY`   | Search-enhanced AI models                |
| Anyscale        | `https://api.endpoints.anyscale.com/v1`               | `ANYSCALE_API_KEY`     | Scalable model endpoints                 |
| Local (Ollama)  | `http://localhost:11434/v1`                           | `OLLAMA_API_KEY`       | Local model serving                      |
| Local (vLLM)    | `http://localhost:8000/v1`                            | `VLLM_API_KEY`         | Local high-throughput serving            |
| Local (LM Studio)| `http://localhost:1234/v1`                           | `LMSTUDIO_API_KEY`     | Local desktop model serving              |

> [!tip]
> You can copy and paste any of the provider configurations below and customize them for your needs. Simply replace the API key placeholder with your actual key or environment variable name.

### SDKs Used for API Requests

Qwen Code uses the following official SDKs to send requests to each provider:

| Auth Type    | SDK Package                                                                                     |
| ------------ | ----------------------------------------------------------------------------------------------- |
| `openai`     | [`openai`](https://www.npmjs.com/package/openai) - Official OpenAI Node.js SDK                  |
| `anthropic`  | [`@anthropic-ai/sdk`](https://www.npmjs.com/package/@anthropic-ai/sdk) - Official Anthropic SDK |
| `gemini`     | [`@google/genai`](https://www.npmjs.com/package/@google/genai) - Official Google GenAI SDK      |
| `qwen-oauth` | [`openai`](https://www.npmjs.com/package/openai) with custom provider (DashScope-compatible)    |

This means the `baseUrl` you configure should be compatible with the corresponding SDK's expected API format. For example, when using `openai` auth type, the endpoint must accept OpenAI API format requests.

### OpenAI-compatible providers (`openai`)

This auth type supports not only OpenAI's official API but also any OpenAI-compatible endpoint, including aggregated model providers like OpenRouter.

#### Quick Copy-Paste Configurations

Below are ready-to-use configurations for popular providers. Simply copy the one you need and add it to your `settings.json`.

<details>
<summary><strong>OpenAI (Official)</strong></summary>

```json
{
  "env": {
    "OPENAI_API_KEY": "sk-your-actual-openai-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "envKey": "OPENAI_API_KEY",
        "baseUrl": "https://api.openai.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.2,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>DashScope (Qwen Models)</strong></summary>

```json
{
  "env": {
    "DASHSCOPE_API_KEY": "sk-your-dashscope-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "qwen-plus",
        "name": "Qwen Plus",
        "envKey": "DASHSCOPE_API_KEY",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>DeepSeek</strong></summary>

```json
{
  "env": {
    "DEEPSEEK_API_KEY": "your-deepseek-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "deepseek-chat",
        "name": "DeepSeek Chat",
        "envKey": "DEEPSEEK_API_KEY",
        "baseUrl": "https://api.deepseek.com/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.6,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>OpenRouter (Multi-Provider Aggregator)</strong></summary>

```json
{
  "env": {
    "OPENROUTER_API_KEY": "sk-or-your-openrouter-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "anthropic/claude-3.5-sonnet",
        "name": "Claude 3.5 Sonnet (via OpenRouter)",
        "envKey": "OPENROUTER_API_KEY",
        "baseUrl": "https://openrouter.ai/api/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.5,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Groq (Fast Inference)</strong></summary>

```json
{
  "env": {
    "GROQ_API_KEY": "your-groq-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "llama-3.1-70b-versatile",
        "name": "Llama 3.1 70B (Groq)",
        "envKey": "GROQ_API_KEY",
        "baseUrl": "https://api.groq.com/openai/v1",
        "generationConfig": {
          "timeout": 30000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Fireworks AI</strong></summary>

```json
{
  "env": {
    "FIREWORKS_API_KEY": "your-fireworks-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "accounts/fireworks/models/llama-v3p1-70b-instruct",
        "name": "Llama 3.1 70B (Fireworks)",
        "envKey": "FIREWORKS_API_KEY",
        "baseUrl": "https://api.fireworks.ai/inference/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Together AI</strong></summary>

```json
{
  "env": {
    "TOGETHER_API_KEY": "your-together-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "meta-llama/Llama-3.1-70B-Instruct-Turbo",
        "name": "Llama 3.1 70B (Together)",
        "envKey": "TOGETHER_API_KEY",
        "baseUrl": "https://api.together.xyz/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Mistral AI</strong></summary>

```json
{
  "env": {
    "MISTRAL_API_KEY": "your-mistral-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "mistral-large-latest",
        "name": "Mistral Large",
        "envKey": "MISTRAL_API_KEY",
        "baseUrl": "https://api.mistral.ai/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Perplexity AI</strong></summary>

```json
{
  "env": {
    "PERPLEXITY_API_KEY": "your-perplexity-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "sonar-pro",
        "name": "Sonar Pro (Perplexity)",
        "envKey": "PERPLEXITY_API_KEY",
        "baseUrl": "https://api.perplexity.ai",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.2,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>Anyscale Endpoints</strong></summary>

```json
{
  "env": {
    "ANYSCALE_API_KEY": "your-anyscale-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "meta-llama/Llama-3.1-70B-Instruct",
        "name": "Llama 3.1 70B (Anyscale)",
        "envKey": "ANYSCALE_API_KEY",
        "baseUrl": "https://api.endpoints.anyscale.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>ModelScope</strong></summary>

```json
{
  "env": {
    "MODELSCOPE_API_KEY": "your-modelscope-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "qwen-max",
        "name": "Qwen Max (ModelScope)",
        "envKey": "MODELSCOPE_API_KEY",
        "baseUrl": "https://api-inference.modelscope.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```
</details>

<details>
<summary><strong>SiliconCloud (硅基流动)</strong></summary>

```json
{
  "env": {
    "SILICONCLOUD_API_KEY": "your-siliconcloud-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "Qwen/Qwen2.5-72B-Instruct",
        "name": "Qwen2.5 72B Instruct (SiliconCloud)",
        "envKey": "SILICONCLOUD_API_KEY",
        "baseUrl": "https://api.siliconflow.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "Pro/Qwen/Qwen2.5-72B-Instruct",
        "name": "Qwen2.5 72B Pro (SiliconCloud)",
        "envKey": "SILICONCLOUD_API_KEY",
        "baseUrl": "https://api.siliconflow.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Volcengine (火山引擎)</strong></summary>

```json
{
  "env": {
    "VOLCENGINE_API_KEY": "your-volcengine-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "doubao-pro-4k",
        "name": "Doubao Pro 4K (Volcengine)",
        "envKey": "VOLCENGINE_API_KEY",
        "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "doubao-lite-32k",
        "name": "Doubao Lite 32K (Volcengine)",
        "envKey": "VOLCENGINE_API_KEY",
        "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Baidu Qianfan (千帆)</strong></summary>

```json
{
  "env": {
    "QIANFAN_API_KEY": "your-qianfan-api-key-here",
    "QIANFAN_SECRET_KEY": "your-qianfan-secret-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "ernie-bot-4",
        "name": "ERNIE Bot 4.0 (Qianfan)",
        "envKey": "QIANFAN_API_KEY",
        "baseUrl": "https://qianfan.baidubce.com/v2",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Tencent Hunyuan (腾讯混元)</strong></summary>

```json
{
  "env": {
    "HUNYUAN_API_KEY": "your-hunyuan-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "hunyuan-pro",
        "name": "Hunyuan Pro (Tencent)",
        "envKey": "HUNYUAN_API_KEY",
        "baseUrl": "https://hunyuan.tencentcloudapi.com",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Zhipu AI (智谱 AI)</strong></summary>

```json
{
  "env": {
    "ZHIPU_API_KEY": "your-zhipu-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "glm-4",
        "name": "GLM-4 (Zhipu)",
        "envKey": "ZHIPU_API_KEY",
        "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "glm-4-flash",
        "name": "GLM-4 Flash (Zhipu)",
        "envKey": "ZHIPU_API_KEY",
        "baseUrl": "https://open.bigmodel.cn/api/paas/v4",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Moonshot AI (月之暗面)</strong></summary>

```json
{
  "env": {
    "MOONSHOT_API_KEY": "your-moonshot-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "moonshot-v1-8k",
        "name": "Moonshot v1 8K",
        "envKey": "MOONSHOT_API_KEY",
        "baseUrl": "https://api.moonshot.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "moonshot-v1-32k",
        "name": "Moonshot v1 32K",
        "envKey": "MOONSHOT_API_KEY",
        "baseUrl": "https://api.moonshot.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      },
      {
        "id": "moonshot-v1-128k",
        "name": "Moonshot v1 128K",
        "envKey": "MOONSHOT_API_KEY",
        "baseUrl": "https://api.moonshot.cn/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 16384
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>MiniMax</strong></summary>

```json
{
  "env": {
    "MINIMAX_API_KEY": "your-minimax-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "abab6.5-chat",
        "name": "MiniMax abab6.5 Chat",
        "envKey": "MINIMAX_API_KEY",
        "baseUrl": "https://api.minimax.chat/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>StepFun (阶跃星辰)</strong></summary>

```json
{
  "env": {
    "STEPFUN_API_KEY": "your-stepfun-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "step-1-8k",
        "name": "Step-1 8K",
        "envKey": "STEPFUN_API_KEY",
        "baseUrl": "https://api.stepfun.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Lingyiwanwu (零一万物)</strong></summary>

```json
{
  "env": {
    "LINGYIWANWU_API_KEY": "your-lingyiwanwu-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "yi-large",
        "name": "Yi-Large",
        "envKey": "LINGYIWANWU_API_KEY",
        "baseUrl": "https://api.lingyiwanwu.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "yi-medium",
        "name": "Yi-Medium",
        "envKey": "LINGYIWANWU_API_KEY",
        "baseUrl": "https://api.lingyiwanwu.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Azure OpenAI</strong></summary>

```json
{
  "env": {
    "AZURE_OPENAI_API_KEY": "your-azure-openai-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "gpt-4o",
        "name": "GPT-4o (Azure)",
        "envKey": "AZURE_OPENAI_API_KEY",
        "baseUrl": "https://YOUR_RESOURCE.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.2,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Cohere</strong></summary>

```json
{
  "env": {
    "COHERE_API_KEY": "your-cohere-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "command-r-plus",
        "name": "Command R+ (Cohere)",
        "envKey": "COHERE_API_KEY",
        "baseUrl": "https://api.cohere.ai/compatibility/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Replicate</strong></summary>

```json
{
  "env": {
    "REPLICATE_API_KEY": "your-replicate-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "meta/meta-llama-3-70b-instruct",
        "name": "Llama 3 70B (Replicate)",
        "envKey": "REPLICATE_API_KEY",
        "baseUrl": "https://api.replicate.com/v1/openai",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>NVIDIA NIM</strong></summary>

```json
{
  "env": {
    "NVIDIA_API_KEY": "your-nvidia-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "meta/llama3-70b-instruct",
        "name": "Llama 3 70B (NVIDIA NIM)",
        "envKey": "NVIDIA_API_KEY",
        "baseUrl": "https://integrate.api.nvidia.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

<details>
<summary><strong>Hugging Face Inference Endpoints</strong></summary>

```json
{
  "env": {
    "HUGGINGFACE_API_KEY": "your-huggingface-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "your-model-id",
        "name": "Custom Model (HF Endpoints)",
        "envKey": "HUGGINGFACE_API_KEY",
        "baseUrl": "https://YOUR_ENDPOINT_ID.us-east-1.aws.endpoints.huggingface.cloud/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

</details>

#### Full Example with Multiple Providers

```json
{
  "env": {
    "OPENAI_API_KEY": "sk-your-actual-openai-key-here",
    "DASHSCOPE_API_KEY": "sk-your-dashscope-key-here",
    "DEEPSEEK_API_KEY": "your-deepseek-api-key-here",
    "OPENROUTER_API_KEY": "sk-or-your-openrouter-key-here",
    "GROQ_API_KEY": "your-groq-api-key-here"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "envKey": "OPENAI_API_KEY",
        "baseUrl": "https://api.openai.com/v1",
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 3,
          "enableCacheControl": true,
          "contextWindowSize": 128000,
          "modalities": {
            "image": true
          },
          "customHeaders": {
            "X-Client-Request-ID": "req-123"
          },
          "extra_body": {
            "enable_thinking": true,
            "service_tier": "priority"
          },
          "samplingParams": {
            "temperature": 0.2,
            "top_p": 0.8,
            "max_tokens": 4096,
            "presence_penalty": 0.1,
            "frequency_penalty": 0.1
          }
        }
      },
      {
        "id": "qwen-plus",
        "name": "Qwen Plus",
        "envKey": "DASHSCOPE_API_KEY",
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192
          }
        }
      },
      {
        "id": "deepseek-chat",
        "name": "DeepSeek Chat",
        "envKey": "DEEPSEEK_API_KEY",
        "baseUrl": "https://api.deepseek.com/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.6,
            "max_tokens": 8192
          }
        }
      },
      {
        "id": "llama-3.1-70b-groq",
        "name": "Llama 3.1 70B (Groq)",
        "envKey": "GROQ_API_KEY",
        "baseUrl": "https://api.groq.com/openai/v1",
        "generationConfig": {
          "timeout": 30000,
          "maxRetries": 3,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

### Anthropic (`anthropic`)

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "sk-ant-your-actual-anthropic-key-here"
  },
  "modelProviders": {
    "anthropic": [
      {
        "id": "claude-3-5-sonnet",
        "name": "Claude 3.5 Sonnet",
        "envKey": "ANTHROPIC_API_KEY",
        "baseUrl": "https://api.anthropic.com/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 3,
          "contextWindowSize": 200000,
          "samplingParams": {
            "temperature": 0.7,
            "max_tokens": 8192,
            "top_p": 0.9
          }
        }
      },
      {
        "id": "claude-3-opus",
        "name": "Claude 3 Opus",
        "envKey": "ANTHROPIC_API_KEY",
        "baseUrl": "https://api.anthropic.com/v1",
        "generationConfig": {
          "timeout": 180000,
          "samplingParams": {
            "temperature": 0.3,
            "max_tokens": 4096
          }
        }
      }
    ]
  }
}
```

### Google Gemini (`gemini`)

```json
{
  "env": {
    "GEMINI_API_KEY": "AIza-your-actual-gemini-key-here"
  },
  "modelProviders": {
    "gemini": [
      {
        "id": "gemini-2.0-flash",
        "name": "Gemini 2.0 Flash",
        "envKey": "GEMINI_API_KEY",
        "baseUrl": "https://generativelanguage.googleapis.com",
        "capabilities": {
          "vision": true
        },
        "generationConfig": {
          "timeout": 60000,
          "maxRetries": 2,
          "contextWindowSize": 1000000,
          "schemaCompliance": "auto",
          "samplingParams": {
            "temperature": 0.4,
            "top_p": 0.95,
            "max_tokens": 8192,
            "top_k": 40
          }
        }
      }
    ]
  }
}
```

### Local Self-Hosted Models (via OpenAI-compatible API)

Most local inference servers (vLLM, Ollama, LM Studio, etc.) provide an OpenAI-compatible API endpoint. Configure them using the `openai` auth type with a local `baseUrl`:

```json
{
  "env": {
    "OLLAMA_API_KEY": "ollama",
    "VLLM_API_KEY": "not-needed",
    "LMSTUDIO_API_KEY": "lm-studio"
  },
  "modelProviders": {
    "openai": [
      {
        "id": "qwen2.5-7b",
        "name": "Qwen2.5 7B (Ollama)",
        "envKey": "OLLAMA_API_KEY",
        "baseUrl": "http://localhost:11434/v1",
        "generationConfig": {
          "timeout": 300000,
          "maxRetries": 1,
          "contextWindowSize": 32768,
          "samplingParams": {
            "temperature": 0.7,
            "top_p": 0.9,
            "max_tokens": 4096
          }
        }
      },
      {
        "id": "llama-3.1-8b",
        "name": "Llama 3.1 8B (vLLM)",
        "envKey": "VLLM_API_KEY",
        "baseUrl": "http://localhost:8000/v1",
        "generationConfig": {
          "timeout": 120000,
          "maxRetries": 2,
          "contextWindowSize": 128000,
          "samplingParams": {
            "temperature": 0.6,
            "max_tokens": 8192
          }
        }
      },
      {
        "id": "local-model",
        "name": "Local Model (LM Studio)",
        "envKey": "LMSTUDIO_API_KEY",
        "baseUrl": "http://localhost:1234/v1",
        "generationConfig": {
          "timeout": 60000,
          "samplingParams": {
            "temperature": 0.5
          }
        }
      }
    ]
  }
}
```

For local servers that don't require authentication, you can use any placeholder value for the API key:

```bash
# For Ollama (no auth required)
export OLLAMA_API_KEY="ollama"

# For vLLM (if no auth is configured)
export VLLM_API_KEY="not-needed"
```

> [!note]
>
> The `extra_body` parameter is **only supported for OpenAI-compatible providers** (`openai`, `qwen-oauth`). It is ignored for Anthropic, and Gemini providers.

> [!note]
>
> **About `envKey`**: The `envKey` field specifies the **name of an environment variable**, not the actual API key value. For the configuration to work, you need to ensure the corresponding environment variable is set with your real API key. There are two ways to do this:
>
> - **Option 1: Using a `.env` file** (recommended for security):
>   ```bash
>   # ~/.qwen/.env (or project root)
>   OPENAI_API_KEY=sk-your-actual-key-here
>   ```
>   Be sure to add `.env` to your `.gitignore` to prevent accidentally committing secrets.
> - **Option 2: Using the `env` field in `settings.json`** (as shown in the examples above):
>   ```json
>   {
>     "env": {
>       "OPENAI_API_KEY": "sk-your-actual-key-here"
>     }
>   }
>   ```
>
> Each provider example includes an `env` field to illustrate how the API key should be configured.

## Complete Provider Reference Table

Below is a comprehensive table of all supported providers with their configuration details:

| Provider | Auth Type | Base URL | Environment Variable | Region | Copy-Paste Ready |
|----------|-----------|----------|---------------------|--------|------------------|
| **OpenAI** | `openai` | `https://api.openai.com/v1` | `OPENAI_API_KEY` | Global | ✅ |
| **DashScope (Qwen)** | `openai` | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `DASHSCOPE_API_KEY` | China/Global | ✅ |
| **DeepSeek** | `openai` | `https://api.deepseek.com/v1` | `DEEPSEEK_API_KEY` | China/Global | ✅ |
| **OpenRouter** | `openai` | `https://openrouter.ai/api/v1` | `OPENROUTER_API_KEY` | Global | ✅ |
| **ModelScope** | `openai` | `https://api-inference.modelscope.cn/v1` | `MODELSCOPE_API_KEY` | China | ✅ |
| **Groq** | `openai` | `https://api.groq.com/openai/v1` | `GROQ_API_KEY` | Global | ✅ |
| **Fireworks AI** | `openai` | `https://api.fireworks.ai/inference/v1` | `FIREWORKS_API_KEY` | Global | ✅ |
| **Together AI** | `openai` | `https://api.together.xyz/v1` | `TOGETHER_API_KEY` | Global | ✅ |
| **Mistral AI** | `openai` | `https://api.mistral.ai/v1` | `MISTRAL_API_KEY` | EU | ✅ |
| **Perplexity** | `openai` | `https://api.perplexity.ai` | `PERPLEXITY_API_KEY` | Global | ✅ |
| **Anyscale** | `openai` | `https://api.endpoints.anyscale.com/v1` | `ANYSCALE_API_KEY` | Global | ✅ |
| **SiliconCloud** | `openai` | `https://api.siliconflow.cn/v1` | `SILICONCLOUD_API_KEY` | China | ✅ |
| **Volcengine** | `openai` | `https://ark.cn-beijing.volces.com/api/v3` | `VOLCENGINE_API_KEY` | China | ✅ |
| **Baidu Qianfan** | `openai` | `https://qianfan.baidubce.com/v2` | `QIANFAN_API_KEY` | China | ✅ |
| **Tencent Hunyuan** | `openai` | `https://hunyuan.tencentcloudapi.com` | `HUNYUAN_API_KEY` | China | ✅ |
| **Zhipu AI** | `openai` | `https://open.bigmodel.cn/api/paas/v4` | `ZHIPU_API_KEY` | China | ✅ |
| **Moonshot AI** | `openai` | `https://api.moonshot.cn/v1` | `MOONSHOT_API_KEY` | China | ✅ |
| **MiniMax** | `openai` | `https://api.minimax.chat/v1` | `MINIMAX_API_KEY` | China | ✅ |
| **StepFun** | `openai` | `https://api.stepfun.com/v1` | `STEPFUN_API_KEY` | China | ✅ |
| **Lingyiwanwu** | `openai` | `https://api.lingyiwanwu.com/v1` | `LINGYIWANWU_API_KEY` | China | ✅ |
| **Azure OpenAI** | `openai` | `https://YOUR_RESOURCE.openai.azure.com` | `AZURE_OPENAI_API_KEY` | Global | ✅ |
| **Cohere** | `openai` | `https://api.cohere.ai/compatibility/v1` | `COHERE_API_KEY` | Global | ✅ |
| **Replicate** | `openai` | `https://api.replicate.com/v1/openai` | `REPLICATE_API_KEY` | Global | ✅ |
| **NVIDIA NIM** | `openai` | `https://integrate.api.nvidia.com/v1` | `NVIDIA_API_KEY` | Global | ✅ |
| **Hugging Face** | `openai` | `https://YOUR_ENDPOINT.endpoints.huggingface.cloud/v1` | `HUGGINGFACE_API_KEY` | Global | ✅ |
| **Ollama (Local)** | `openai` | `http://localhost:11434/v1` | `OLLAMA_API_KEY` | Local | ✅ |
| **vLLM (Local)** | `openai` | `http://localhost:8000/v1` | `VLLM_API_KEY` | Local | ✅ |
| **LM Studio (Local)** | `openai` | `http://localhost:1234/v1` | `LMSTUDIO_API_KEY` | Local | ✅ |
| **Anthropic** | `anthropic` | `https://api.anthropic.com` | `ANTHROPIC_API_KEY` | Global | ✅ |
| **Google Gemini** | `gemini` | `https://generativelanguage.googleapis.com` | `GEMINI_API_KEY` | Global | ✅ |

> [!tip]
> All configurations above are **copy-paste ready**! Simply click on any provider's `<details>` section above, copy the JSON configuration, and paste it into your `settings.json`. Replace the placeholder API key with your actual key or environment variable.

## Alibaba Cloud Coding Plan

Alibaba Cloud Coding Plan provides a pre-configured set of Qwen models optimized for coding tasks. This feature is available for users with Alibaba Cloud Coding Plan API access and offers a simplified setup experience with automatic model configuration updates.

### Overview

When you authenticate with an Alibaba Cloud Coding Plan API key using the `/auth` command, Qwen Code automatically configures the following models:

| Model ID               | Name                 | Description                            |
| ---------------------- | -------------------- | -------------------------------------- |
| `qwen3.5-plus`         | qwen3.5-plus         | Advanced model with thinking enabled   |
| `qwen3-coder-plus`     | qwen3-coder-plus     | Optimized for coding tasks             |
| `qwen3-max-2026-01-23` | qwen3-max-2026-01-23 | Latest max model with thinking enabled |

### Setup

1. Obtain an Alibaba Cloud Coding Plan API key:
   - **China**: <https://bailian.console.aliyun.com/?tab=model#/efm/coding_plan>
   - **International**: <https://modelstudio.console.alibabacloud.com/?tab=dashboard#/efm/coding_plan>
2. Run the `/auth` command in Qwen Code
3. Select **Alibaba Cloud Coding Plan**
4. Select your region
5. Enter your API key when prompted

The models will be automatically configured and added to your `/model` picker.

### Regions

Alibaba Cloud Coding Plan supports two regions:

| Region               | Endpoint                                        | Description             |
| -------------------- | ----------------------------------------------- | ----------------------- |
| China                | `https://coding.dashscope.aliyuncs.com/v1`      | Mainland China endpoint |
| Global/International | `https://coding-intl.dashscope.aliyuncs.com/v1` | International endpoint  |

The region is selected during authentication and stored in `settings.json` under `codingPlan.region`. To switch regions, re-run the `/auth` command and select a different region.

### API Key Storage

When you configure Coding Plan through the `/auth` command, the API key is stored using the reserved environment variable name `BAILIAN_CODING_PLAN_API_KEY`. By default, it is stored in the `env` field of your `settings.json` file.

> [!warning]
>
> **Security Recommendation**: For better security, it is recommended to move the API key from `settings.json` to a separate `.env` file and load it as an environment variable. For example:
>
> ```bash
> # ~/.qwen/.env
> BAILIAN_CODING_PLAN_API_KEY=your-api-key-here
> ```
>
> Then ensure this file is added to your `.gitignore` if you're using project-level settings.

### Automatic Updates

Coding Plan model configurations are versioned. When Qwen Code detects a newer version of the model template, you will be prompted to update. Accepting the update will:

- Replace the existing Coding Plan model configurations with the latest versions
- Preserve any custom model configurations you've added manually
- Automatically switch to the first model in the updated configuration

The update process ensures you always have access to the latest model configurations and features without manual intervention.

### Manual Configuration (Advanced)

If you prefer to manually configure Coding Plan models, you can add them to your `settings.json` like any OpenAI-compatible provider:

```json
{
  "modelProviders": {
    "openai": [
      {
        "id": "qwen3-coder-plus",
        "name": "qwen3-coder-plus",
        "description": "Qwen3-Coder via Alibaba Cloud Coding Plan",
        "envKey": "YOUR_CUSTOM_ENV_KEY",
        "baseUrl": "https://coding.dashscope.aliyuncs.com/v1"
      }
    ]
  }
}
```

> [!note]
>
> When using manual configuration:
>
> - You can use any environment variable name for `envKey`
> - You do not need to configure `codingPlan.*`
> - **Automatic updates will not apply** to manually configured Coding Plan models

> [!warning]
>
> If you also use automatic Coding Plan configuration, automatic updates may overwrite your manual configurations if they use the same `envKey` and `baseUrl` as the automatic configuration. To avoid this, ensure your manual configuration uses a different `envKey` if possible.

## Resolution Layers and Atomicity

The effective auth/model/credential values are chosen per field using the following precedence (first present wins). You can combine `--auth-type` with `--model` to point directly at a provider entry; these CLI flags run before other layers.

| Layer (highest → lowest)   | authType                            | model                                           | apiKey                                              | baseUrl                                              | apiKeyEnvKey           | proxy                             |
| -------------------------- | ----------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- | ---------------------- | --------------------------------- |
| Programmatic overrides     | `/auth`                             | `/auth` input                                   | `/auth` input                                       | `/auth` input                                        | —                      | —                                 |
| Model provider selection   | —                                   | `modelProvider.id`                              | `env[modelProvider.envKey]`                         | `modelProvider.baseUrl`                              | `modelProvider.envKey` | —                                 |
| CLI arguments              | `--auth-type`                       | `--model`                                       | `--openaiApiKey` (or provider-specific equivalents) | `--openaiBaseUrl` (or provider-specific equivalents) | —                      | —                                 |
| Environment variables      | —                                   | Provider-specific mapping (e.g. `OPENAI_MODEL`) | Provider-specific mapping (e.g. `OPENAI_API_KEY`)   | Provider-specific mapping (e.g. `OPENAI_BASE_URL`)   | —                      | —                                 |
| Settings (`settings.json`) | `security.auth.selectedType`        | `model.name`                                    | `security.auth.apiKey`                              | `security.auth.baseUrl`                              | —                      | —                                 |
| Default / computed         | Falls back to `AuthType.QWEN_OAUTH` | Built-in default (OpenAI ⇒ `qwen3-coder-plus`)  | —                                                   | —                                                    | —                      | `Config.getProxy()` if configured |

\*When present, CLI auth flags override settings. Otherwise, `security.auth.selectedType` or the implicit default determine the auth type. Qwen OAuth and OpenAI are the only auth types surfaced without extra configuration.

> [!warning]
>
> **Deprecation of `security.auth.apiKey` and `security.auth.baseUrl`:** Directly configuring API credentials via `security.auth.apiKey` and `security.auth.baseUrl` in `settings.json` is deprecated. These settings were used in historical versions for credentials entered through the UI, but the credential input flow was removed in version 0.10.1. These fields will be fully removed in a future release. **It is strongly recommended to migrate to `modelProviders`** for all model and credential configurations. Use `envKey` in `modelProviders` to reference environment variables for secure credential management instead of hardcoding credentials in settings files.

## Generation Config Layering: The Impermeable Provider Layer

The configuration resolution follows a strict layering model with one crucial rule: **the modelProvider layer is impermeable**.

### How it works

1. **When a modelProvider model IS selected** (e.g., via `/model` command choosing a provider-configured model):
   - The entire `generationConfig` from the provider is applied **atomically**
   - **The provider layer is completely impermeable** — lower layers (CLI, env, settings) do not participate in generationConfig resolution at all
   - All fields defined in `modelProviders[].generationConfig` use the provider's values
   - All fields **not defined** by the provider are set to `undefined` (not inherited from settings)
   - This ensures provider configurations act as a complete, self-contained "sealed package"

2. **When NO modelProvider model is selected** (e.g., using `--model` with a raw model ID, or using CLI/env/settings directly):
   - The resolution falls through to lower layers
   - Fields are populated from CLI → env → settings → defaults
   - This creates a **Runtime Model** (see next section)

### Per-field precedence for `generationConfig`

| Priority | Source                                        | Behavior                                                                                                 |
| -------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1        | Programmatic overrides                        | Runtime `/model`, `/auth` changes                                                                        |
| 2        | `modelProviders[authType][].generationConfig` | **Impermeable layer** - completely replaces all generationConfig fields; lower layers do not participate |
| 3        | `settings.model.generationConfig`             | Only used for **Runtime Models** (when no provider model is selected)                                    |
| 4        | Content-generator defaults                    | Provider-specific defaults (e.g., OpenAI vs Gemini) - only for Runtime Models                            |

### Atomic field treatment

The following fields are treated as atomic objects - provider values completely replace the entire object, no merging occurs:

- `samplingParams` - Temperature, top_p, max_tokens, etc.
- `customHeaders` - Custom HTTP headers
- `extra_body` - Extra request body parameters

### Example

```json
// User settings (~/.qwen/settings.json)
{
  "model": {
    "generationConfig": {
      "timeout": 30000,
      "samplingParams": { "temperature": 0.5, "max_tokens": 1000 }
    }
  }
}

// modelProviders configuration
{
  "modelProviders": {
    "openai": [{
      "id": "gpt-4o",
      "envKey": "OPENAI_API_KEY",
      "generationConfig": {
        "timeout": 60000,
        "samplingParams": { "temperature": 0.2 }
      }
    }]
  }
}
```

When `gpt-4o` is selected from modelProviders:

- `timeout` = 60000 (from provider, overrides settings)
- `samplingParams.temperature` = 0.2 (from provider, completely replaces settings object)
- `samplingParams.max_tokens` = **undefined** (not defined in provider, and provider layer does not inherit from settings — fields are explicitly set to undefined if not provided)

When using a raw model via `--model gpt-4` (not from modelProviders, creates a Runtime Model):

- `timeout` = 30000 (from settings)
- `samplingParams.temperature` = 0.5 (from settings)
- `samplingParams.max_tokens` = 1000 (from settings)

The merge strategy for `modelProviders` itself is REPLACE: the entire `modelProviders` from project settings will override the corresponding section in user settings, rather than merging the two.

## Provider Models vs Runtime Models

Qwen Code distinguishes between two types of model configurations:

### Provider Model

- Defined in `modelProviders` configuration
- Has a complete, atomic configuration package
- When selected, its configuration is applied as an impermeable layer
- Appears in `/model` command list with full metadata (name, description, capabilities)
- Recommended for multi-model workflows and team consistency

### Runtime Model

- Created dynamically when using raw model IDs via CLI (`--model`), environment variables, or settings
- Not defined in `modelProviders`
- Configuration is built by "projecting" through resolution layers (CLI → env → settings → defaults)
- Automatically captured as a **RuntimeModelSnapshot** when a complete configuration is detected
- Allows reuse without re-entering credentials

### RuntimeModelSnapshot lifecycle

When you configure a model without using `modelProviders`, Qwen Code automatically creates a RuntimeModelSnapshot to preserve your configuration:

```bash
# This creates a RuntimeModelSnapshot with ID: $runtime|openai|my-custom-model
qwen --auth-type openai --model my-custom-model --openaiApiKey $KEY --openaiBaseUrl https://api.example.com/v1
```

The snapshot:

- Captures model ID, API key, base URL, and generation config
- Persists across sessions (stored in memory during runtime)
- Appears in the `/model` command list as a runtime option
- Can be switched to using `/model $runtime|openai|my-custom-model`

### Key differences

| Aspect                  | Provider Model                    | Runtime Model                              |
| ----------------------- | --------------------------------- | ------------------------------------------ |
| Configuration source    | `modelProviders` in settings      | CLI, env, settings layers                  |
| Configuration atomicity | Complete, impermeable package     | Layered, each field resolved independently |
| Reusability             | Always available in `/model` list | Captured as snapshot, appears if complete  |
| Team sharing            | Yes (via committed settings)      | No (user-local)                            |
| Credential storage      | Reference via `envKey` only       | May capture actual key in snapshot         |

### When to use each

- **Use Provider Models** when: You have standard models shared across a team, need consistent configurations, or want to prevent accidental overrides
- **Use Runtime Models** when: Quickly testing a new model, using temporary credentials, or working with ad-hoc endpoints

## Selection Persistence and Recommendations

> [!important]
>
> Define `modelProviders` in the user-scope `~/.qwen/settings.json` whenever possible and avoid persisting credential overrides in any scope. Keeping the provider catalog in user settings prevents merge/override conflicts between project and user scopes and ensures `/auth` and `/model` updates always write back to a consistent scope.

- `/model` and `/auth` persist `model.name` (where applicable) and `security.auth.selectedType` to the closest writable scope that already defines `modelProviders`; otherwise they fall back to the user scope. This keeps workspace/user files in sync with the active provider catalog.
- Without `modelProviders`, the resolver mixes CLI/env/settings layers, creating Runtime Models. This is fine for single-provider setups but cumbersome when frequently switching. Define provider catalogs whenever multi-model workflows are common so that switches stay atomic, source-attributed, and debuggable.
