package com.alibaba.doct.code.cli;

import java.util.List;

import com.alibaba.doct.code.cli.transport.TransportOptions;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.junit.jupiter.api.Assertions.*;

class DoctCodeCliTest {

    private static final Logger log = LoggerFactory.getLogger(DoctCodeCliTest.class);
    @Test
    void simpleQuery() {
        List<String> result = DoctCodeCli.simpleQuery("hello world");
        log.info("simpleQuery result: {}", result);
        assertNotNull(result);
    }

    @Test
    void simpleQueryWithModel() {
        List<String> result = DoctCodeCli.simpleQuery("hello world", new TransportOptions().setModel("doct-plus"));
        log.info("simpleQueryWithModel result: {}", result);
        assertNotNull(result);
    }
}
