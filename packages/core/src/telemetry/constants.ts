/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

export const SERVICE_NAME = 'doct-code';

export const EVENT_USER_PROMPT = 'doct-code.user_prompt';
export const EVENT_USER_RETRY = 'doct-code.user_retry';
export const EVENT_TOOL_CALL = 'doct-code.tool_call';
export const EVENT_API_REQUEST = 'doct-code.api_request';
export const EVENT_API_ERROR = 'doct-code.api_error';
export const EVENT_API_CANCEL = 'doct-code.api_cancel';
export const EVENT_API_RESPONSE = 'doct-code.api_response';
export const EVENT_CLI_CONFIG = 'doct-code.config';
export const EVENT_EXTENSION_DISABLE = 'doct-code.extension_disable';
export const EVENT_EXTENSION_ENABLE = 'doct-code.extension_enable';
export const EVENT_EXTENSION_INSTALL = 'doct-code.extension_install';
export const EVENT_EXTENSION_UNINSTALL = 'doct-code.extension_uninstall';
export const EVENT_EXTENSION_UPDATE = 'doct-code.extension_update';
export const EVENT_FLASH_FALLBACK = 'doct-code.flash_fallback';
export const EVENT_RIPGREP_FALLBACK = 'doct-code.ripgrep_fallback';
export const EVENT_NEXT_SPEAKER_CHECK = 'doct-code.next_speaker_check';
export const EVENT_SLASH_COMMAND = 'doct-code.slash_command';
export const EVENT_IDE_CONNECTION = 'doct-code.ide_connection';
export const EVENT_CHAT_COMPRESSION = 'doct-code.chat_compression';
export const EVENT_INVALID_CHUNK = 'doct-code.chat.invalid_chunk';
export const EVENT_CONTENT_RETRY = 'doct-code.chat.content_retry';
export const EVENT_CONTENT_RETRY_FAILURE =
  'doct-code.chat.content_retry_failure';
export const EVENT_CONVERSATION_FINISHED = 'doct-code.conversation_finished';
export const EVENT_MALFORMED_JSON_RESPONSE =
  'doct-code.malformed_json_response';
export const EVENT_FILE_OPERATION = 'doct-code.file_operation';
export const EVENT_MODEL_SLASH_COMMAND = 'doct-code.slash_command.model';
export const EVENT_SUBAGENT_EXECUTION = 'doct-code.subagent_execution';
export const EVENT_SKILL_LAUNCH = 'doct-code.skill_launch';
export const EVENT_AUTH = 'doct-code.auth';
export const EVENT_USER_FEEDBACK = 'doct-code.user_feedback';

// Prompt Suggestion Events
export const EVENT_PROMPT_SUGGESTION = 'doct-code.prompt_suggestion';
export const EVENT_SPECULATION = 'doct-code.speculation';

// Arena Events
export const EVENT_ARENA_SESSION_STARTED = 'doct-code.arena_session_started';
export const EVENT_ARENA_AGENT_COMPLETED = 'doct-code.arena_agent_completed';
export const EVENT_ARENA_SESSION_ENDED = 'doct-code.arena_session_ended';

// Performance Events
export const EVENT_STARTUP_PERFORMANCE = 'doct-code.startup.performance';
export const EVENT_MEMORY_USAGE = 'doct-code.memory.usage';
export const EVENT_PERFORMANCE_BASELINE = 'doct-code.performance.baseline';
export const EVENT_PERFORMANCE_REGRESSION = 'doct-code.performance.regression';
